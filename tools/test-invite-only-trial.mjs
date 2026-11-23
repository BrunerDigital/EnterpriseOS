import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import vm from "node:vm";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const fixture = {
  email: "fixture@example.invalid",
  source: "Owner-operator go-to-market",
  phone: "5550100",
  utm_campaign: "isolated-fixture",
  unexpected_fixture: "not-an-approved-field",
  webhook_url: "https://example.invalid/not-a-public-lead-field",
  thank_you_path: "/retired",
  page_url: "https://example.invalid/demo?private=fixture#sample"
};

async function loadFixtureModule(path, exports, env = {}) {
  const source = stripTypeScriptTypes(await read(path))
    .replace(/^import .*?;\s*$/gm, "")
    .replace(/^export (async function|function) /gm, "$1 ");
  return vm.runInNewContext(source + `\n({ ${exports.join(", ")} });`, { URL, console, ...env });
}

const response = { json: (body, { status = 200 } = {}) => ({ status, body }) };
const plain = (value) => JSON.parse(JSON.stringify(value));

test("retired signup routes use the private walkthrough and are not public sitemap entries", async () => {
  for (const path of ["signup", "signup/thank-you"]) {
    const code = await read(`app/${path}/page.tsx`);
    assert.match(code, /redirect\("\/demo"\)/);
    assert.doesNotMatch(code, /FlowPageView|LeadForm/);
  }
  const marketing = await read("lib/marketing.ts");
  assert.doesNotMatch(marketing, /slug: "\/signup(?:\/thank-you)?"/);
  assert.doesNotMatch(await read("lib/gtm-lanes.ts"), /thankYouPath: "\/signup/);
  assert.match(await read("app/sitemap.ts"), /flowSteps\.map/);
  const thankYou = await read("app/demo/thank-you/page.tsx");
  assert.match(thankYou, /reviews walkthrough requests/);
  assert.doesNotMatch(thankYou, /workspace is ready|Account created/);
});

test("generic intake drops unapproved and non-string fields before the audit/notification sinks", async () => {
  const selector = await loadFixtureModule("lib/server/public-lead-payload.ts",
    ["selectPublicLeadPayload", "isRetiredTrialSource"]);
  let audit, notification;
  const db = { from: (table) => {
    if (table === "tenants") return { select: () => ({
      eq: () => ({ maybeSingle: async () => ({ data: { id: "fixture-tenant" } }) })
    }) };
    assert.equal(table, "audit_logs");
    return { insert: async (data) => { audit = data; } };
  } };
  const { POST } = await loadFixtureModule("app/api/leads/route.ts", ["POST"], {
    ...selector, NextResponse: response, walkthroughFormSource: "Public walkthrough",
    createAdminClient: () => db, inquiryWorkspaceId: () => undefined,
    notifyLead: async (payload) => { notification = payload; return []; }
  });
  const result = await POST({ json: async () => ({ ...fixture, website: "", company: { unexpected: true } }) });
  assert.equal(result.status, 200);
  assert.equal(result.body.redirect, "/demo/thank-you/");
  const expected = {
    email: fixture.email, source: fixture.source, phone: fixture.phone,
    utm_campaign: fixture.utm_campaign, page_url: "https://example.invalid/demo"
  };
  assert.deepEqual(plain(audit.metadata.payload), expected);
  assert.deepEqual(plain(notification), expected);
  audit = notification = undefined;
  const filtered = await POST({ json: async () => ({ ...fixture, website: "fixture-honeypot" }) });
  assert.equal(filtered.status, 200);
  assert.equal(audit, undefined);
  assert.equal(notification, undefined);
  const retired = await POST({ json: async () => ({ ...fixture, source: "Free Trial Signup" }) });
  assert.equal(retired.status, 410);
  assert.equal(audit, undefined);
  assert.equal(notification, undefined);
});

test("walkthrough route acknowledges only accepted persistence, with same receipt on replay", async () => {
  let accepts = 0;
  let unavailable = false;
  const origin = "https://example.invalid";
  const { POST } = await loadFixtureModule("app/api/walkthroughs/route.ts", ["POST"], {
    NextResponse: response, process: { env: { NEXT_PUBLIC_APP_URL: origin } },
    inquiryWorkspaceId: () => "fixture-workspace",
    readInquiryBody: async () => Buffer.from(JSON.stringify({ email: fixture.email })),
    walkthroughInquiry: { safeParse: (payload) => ({ success: true, data: payload }) },
    saveWalkthroughInquiry: async (workspace, data) => {
      assert.equal(workspace, "fixture-workspace");
      assert.equal(data.email, fixture.email);
      return unavailable ? { status: "unavailable" }
        : { status: "accepted", receipt: "fixture-receipt", replayed: ++accepts > 1 };
    }
  });
  const request = { headers: new Headers({ origin, "content-type": "application/json" }) };
  const first = await POST(request);
  assert.deepEqual([first.status, first.body.accepted, first.body.receipt_id], [201, true, "fixture-receipt"]);
  const retry = await POST(request);
  assert.deepEqual([retry.status, retry.body.replayed, retry.body.receipt_id], [200, true, "fixture-receipt"]);
  unavailable = true;
  const failed = await POST(request);
  assert.deepEqual([failed.status, failed.body.accepted, failed.body.receipt_id], [503, false, undefined]);
});
