import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const logoBuffer = await readFile(path.join(root, "public", "brand", "digital-360-logo.jpg"));
const logoUrl = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

const assets = [
  {
    file: "public/og/brunerdigital-og.png",
    width: 1200,
    height: 630,
    title: "Your growth operating system, fully connected.",
    kicker: "Digital360 by BrunerDigital",
    body: "CRM, automation, conversations, calendars, funnels, reviews, reporting, portals, billing, and AI in one connected workspace.",
    cta: "Book a launch walkthrough",
    layout: "landscape"
  },
  {
    file: "public/social/digital360-launch-linkedin.png",
    width: 1200,
    height: 628,
    title: "Disconnected tools are costing you speed.",
    kicker: "Digital360 public launch",
    body: "Bring leads, follow-up, appointments, pipeline, reviews, reporting, billing, portals, and AI into one operating layer.",
    cta: "Schedule your rollout map",
    layout: "landscape"
  },
  {
    file: "public/social/digital360-x-card.png",
    width: 1200,
    height: 675,
    title: "The all-in-one growth OS for serious operators.",
    kicker: "Digital360 by BrunerDigital",
    body: "Capture demand, respond faster, book more appointments, and prove what is working from one premium workspace.",
    cta: "digital360.brunerdigital.com",
    layout: "landscape"
  },
  {
    file: "public/social/digital360-launch-square.png",
    width: 1080,
    height: 1080,
    title: "Replace the messy growth stack.",
    kicker: "Digital360 by BrunerDigital",
    body: "CRM. Inbox. Calendar. Funnels. Reviews. Reporting. Billing. Client portals. AI.",
    cta: "Book a launch walkthrough",
    layout: "square"
  },
  {
    file: "public/social/digital360-story.png",
    width: 1080,
    height: 1920,
    title: "Your business growth OS is live.",
    kicker: "Digital360 by BrunerDigital",
    body: "Built for agencies, service businesses, franchises, and growth teams that need one connected command center.",
    cta: "Book a demo today",
    layout: "story"
  },
  {
    file: "public/social/digital360-carousel-01-problem.png",
    width: 1080,
    height: 1080,
    title: "Your leads are not the problem.",
    kicker: "01 / The leak",
    body: "The leak is the handoff between forms, follow-up, calendars, pipeline, reporting, and reviews.",
    cta: "Digital360 connects the workflow.",
    layout: "carousel",
    metric: "Speed-to-lead"
  },
  {
    file: "public/social/digital360-carousel-02-speed.png",
    width: 1080,
    height: 1080,
    title: "Respond before intent fades.",
    kicker: "02 / The fix",
    body: "Route new leads, trigger follow-up, suggest replies, book appointments, and create next steps automatically.",
    cta: "Built for fast operators.",
    layout: "carousel",
    metric: "Response engine"
  },
  {
    file: "public/social/digital360-carousel-03-proof.png",
    width: 1080,
    height: 1080,
    title: "Prove what is working.",
    kicker: "03 / The proof",
    body: "Dashboards, attribution views, pipeline health, reviews, and AI insights give every team a single source of truth.",
    cta: "Know what to scale.",
    layout: "carousel",
    metric: "Growth intelligence"
  },
  {
    file: "public/social/digital360-carousel-04-offer.png",
    width: 1080,
    height: 1080,
    title: "Book the walkthrough.",
    kicker: "04 / The offer",
    body: "We will map your current stack, identify the biggest leaks, and show the Digital360 rollout path.",
    cta: "digital360.brunerdigital.com",
    layout: "carousel",
    metric: "7-14 day launch path"
  }
];

await mkdir(path.join(root, "public", "og"), { recursive: true });
await mkdir(path.join(root, "public", "social"), { recursive: true });

const browser = await chromium.launch();

try {
  for (const asset of assets) {
    const page = await browser.newPage({
      viewport: { width: asset.width, height: asset.height },
      deviceScaleFactor: 1
    });
    await page.setContent(renderAsset(asset), { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(root, asset.file), type: "png" });
    await page.close();
    console.log(`Generated ${asset.file} (${asset.width}x${asset.height})`);
  }
} finally {
  await browser.close();
}

function renderAsset(asset) {
  const isStory = asset.layout === "story";
  const isSquare = asset.layout === "square" || asset.layout === "carousel";
  const titleSize = isStory ? 94 : isSquare ? 76 : 58;
  const bodySize = isStory ? 34 : isSquare ? 29 : 22;
  const padding = isStory ? 72 : isSquare ? 58 : 54;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body { width: ${asset.width}px; height: ${asset.height}px; margin: 0; overflow: hidden; }
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #fff;
    background: #030712;
  }
  .canvas {
    position: relative;
    width: ${asset.width}px;
    height: ${asset.height}px;
    padding: ${padding}px;
    overflow: hidden;
    background:
      radial-gradient(circle at 78% 26%, rgba(37, 99, 235, .36), transparent 340px),
      radial-gradient(circle at 35% 80%, rgba(16, 185, 129, .24), transparent 320px),
      linear-gradient(135deg, #020617 0%, #061426 45%, #040817 100%);
  }
  .canvas:before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(148,163,184,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,.055) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(circle at 68% 38%, black, transparent 74%);
  }
  .canvas:after {
    content: "";
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(148,163,184,.2);
    border-radius: 30px;
    pointer-events: none;
  }
  .grain {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 24% 28%, rgba(255,255,255,.12) 0 1px, transparent 2px),
      radial-gradient(circle at 72% 60%, rgba(96,165,250,.16) 0 1px, transparent 2px),
      radial-gradient(circle at 54% 18%, rgba(45,212,191,.14) 0 1px, transparent 2px);
    background-size: 130px 160px, 180px 190px, 210px 170px;
    opacity: .6;
  }
  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: grid;
    grid-template-columns: ${isStory || isSquare ? "1fr" : "0.9fr 1.1fr"};
    gap: ${isStory ? "62px" : isSquare ? "44px" : "34px"};
    align-items: center;
  }
  .brand {
    position: absolute;
    top: ${padding}px;
    left: ${padding}px;
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 5;
  }
  .logo {
    width: ${isStory ? 92 : 70}px;
    height: ${isStory ? 92 : 70}px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.24);
    box-shadow: 0 0 40px rgba(37,99,235,.3);
    object-fit: cover;
  }
  .brand-title { font-size: ${isStory ? 30 : 23}px; font-weight: 760; letter-spacing: 0; line-height: 1; }
  .brand-sub { margin-top: 6px; font-size: ${isStory ? 21 : 15}px; color: #94a3b8; }
  .copy {
    align-self: ${isStory ? "end" : "center"};
    padding-top: ${isStory || isSquare ? "110px" : "58px"};
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: ${isStory ? "16px 20px" : "11px 14px"};
    border: 1px solid rgba(45,212,191,.28);
    border-radius: 12px;
    background: rgba(45,212,191,.09);
    color: #a7f3d0;
    font-size: ${isStory ? 23 : 16}px;
    font-weight: 700;
  }
  .pulse {
    width: 9px;
    height: 9px;
    border-radius: 99px;
    background: #34d399;
    box-shadow: 0 0 24px #34d399;
  }
  h1 {
    margin: ${isStory ? "44px 0 0" : isSquare ? "30px 0 0" : "24px 0 0"};
    max-width: ${isStory ? "850px" : isSquare ? "880px" : "540px"};
    font-size: ${titleSize}px;
    line-height: .95;
    font-weight: 820;
    letter-spacing: 0;
  }
  .gradient {
    background: linear-gradient(90deg, #5eead4 0%, #60a5fa 52%, #8b5cf6 100%);
    -webkit-background-clip: text;
    color: transparent;
  }
  .body {
    margin-top: ${isStory ? "34px" : isSquare ? "24px" : "18px"};
    max-width: ${isStory ? "820px" : isSquare ? "850px" : "525px"};
    color: #cbd5e1;
    font-size: ${bodySize}px;
    line-height: 1.35;
  }
  .cta {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-top: ${isStory ? "48px" : isSquare ? "34px" : "22px"};
    min-height: ${isStory ? 82 : isSquare ? 58 : 52}px;
    padding: ${isStory ? "0 28px" : isSquare ? "0 22px" : "0 18px"};
    border-radius: 14px;
    color: #fff;
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    box-shadow: 0 0 42px rgba(37,99,235,.4);
    font-size: ${isStory ? 29 : isSquare ? 20 : 18}px;
    font-weight: 760;
  }
  .arrow {
    width: ${isStory ? 30 : 20}px;
    height: ${isStory ? 30 : 20}px;
    border-top: 3px solid currentColor;
    border-right: 3px solid currentColor;
    transform: rotate(45deg);
  }
  .visual {
    position: relative;
    min-height: ${isStory ? "690px" : isSquare ? "390px" : "360px"};
    align-self: ${isStory || isSquare ? "start" : "center"};
  }
  .orb {
    position: absolute;
    inset: ${isStory ? "80px 90px auto" : "44px 70px auto"};
    margin: auto;
    width: ${isStory ? 690 : isSquare ? 420 : 430}px;
    height: ${isStory ? 690 : isSquare ? 420 : 430}px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 42% 44%, rgba(255,255,255,.2), transparent 24%),
      radial-gradient(circle at 55% 55%, rgba(37,99,235,.78), transparent 34%),
      conic-gradient(from 215deg, #2dd4bf, #2563eb, #8b5cf6, #2dd4bf);
    box-shadow:
      inset 0 0 70px rgba(255,255,255,.13),
      0 0 95px rgba(37,99,235,.5),
      0 0 140px rgba(45,212,191,.22);
  }
  .orb:before {
    content: "Digital360";
    position: absolute;
    inset: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 50%;
    background: rgba(2,6,23,.63);
    font-size: ${isStory ? 58 : isSquare ? 36 : 37}px;
    font-weight: 820;
  }
  .orb:after {
    content: "";
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 1px solid rgba(96,165,250,.28);
  }
  .chip {
    position: absolute;
    z-index: 3;
    min-width: ${isStory ? "340px" : "230px"};
    padding: ${isStory ? "24px 26px" : "17px 18px"};
    border: 1px solid rgba(148,163,184,.22);
    border-radius: 16px;
    background: rgba(8,18,33,.82);
    box-shadow: 0 22px 80px rgba(0,0,0,.38);
  }
  .chip b { display: block; font-size: ${isStory ? 27 : 18}px; }
  .chip span { display: block; margin-top: 7px; color: #34d399; font-size: ${isStory ? 24 : 17}px; font-weight: 760; }
  .c1 { top: ${isStory ? 30 : 36}px; left: 0; }
  .c2 { top: ${isStory ? 300 : 170}px; right: 0; }
  .c3 { bottom: ${isStory ? 35 : 38}px; left: ${isStory ? 40 : 18}px; }
  .dashboard {
    position: absolute;
    inset: ${isStory ? "40px 0 auto" : "10px 0 auto"};
    margin: auto;
    width: ${isStory ? "870px" : isSquare ? "820px" : "530px"};
    height: ${isStory ? "700px" : isSquare ? "320px" : "345px"};
    border: 1px solid rgba(148,163,184,.22);
    border-radius: 24px;
    background: rgba(5,12,24,.8);
    box-shadow: 0 28px 100px rgba(0,0,0,.42);
    padding: ${isStory ? "34px" : "24px"};
  }
  .dash-top { display: flex; align-items: center; justify-content: space-between; color: #e2e8f0; font-weight: 740; font-size: ${isStory ? 30 : 18}px; }
  .dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: ${isStory ? "18px" : "12px"}; margin-top: ${isStory ? "28px" : "18px"}; }
  .stat {
    min-height: ${isStory ? "118px" : "78px"};
    padding: ${isStory ? "20px" : "14px"};
    border: 1px solid rgba(148,163,184,.16);
    border-radius: 14px;
    background: rgba(15,23,42,.72);
  }
  .stat small { display: block; color: #94a3b8; font-size: ${isStory ? 19 : 12}px; }
  .stat strong { display: block; margin-top: 8px; font-size: ${isStory ? 36 : 22}px; }
  .stat span { color: #34d399; font-size: ${isStory ? 19 : 12}px; }
  .chart {
    margin-top: ${isStory ? "22px" : "18px"};
    height: ${isStory ? "280px" : isSquare ? "125px" : "135px"};
    border: 1px solid rgba(148,163,184,.16);
    border-radius: 16px;
    background:
      linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px),
      radial-gradient(circle at 70% 40%, rgba(37,99,235,.22), transparent 180px),
      rgba(15,23,42,.62);
    background-size: 100% 25%, 12.5% 100%, auto, auto;
    position: relative;
    overflow: hidden;
  }
  .line {
    position: absolute;
    inset: 22px;
  }
  .bars {
    position: absolute;
    right: 26px;
    bottom: 18px;
    display: flex;
    align-items: end;
    gap: 10px;
    height: 44%;
  }
  .bars i { display: block; width: ${isStory ? 28 : 17}px; border-radius: 8px 8px 2px 2px; background: linear-gradient(#60a5fa, #2563eb); }
  .mini-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${isStory ? "18px" : "12px"};
    margin-top: ${isStory ? "22px" : "14px"};
  }
  .mini {
    border: 1px solid rgba(148,163,184,.16);
    border-radius: 14px;
    background: rgba(15,23,42,.65);
    padding: ${isStory ? "20px" : "13px"};
    font-size: ${isStory ? 20 : 12}px;
    color: #cbd5e1;
  }
  .mini b { color: #fff; }
  .badge-row {
    display: ${isStory || isSquare ? "flex" : "none"};
    flex-wrap: wrap;
    gap: 12px;
    margin-top: ${isStory ? "42px" : isSquare ? "26px" : "18px"};
  }
  .badge {
    border: 1px solid rgba(148,163,184,.17);
    border-radius: 999px;
    background: rgba(255,255,255,.05);
    padding: ${isStory ? "14px 18px" : isSquare ? "10px 13px" : "8px 11px"};
    color: #cbd5e1;
    font-size: ${isStory ? 22 : isSquare ? 14 : 13}px;
  }
  .metric {
    position: absolute;
    right: ${padding}px;
    bottom: ${padding}px;
    z-index: 4;
    color: #93c5fd;
    font-size: ${isStory ? 31 : isSquare ? 22 : 18}px;
    font-weight: 760;
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="grain"></div>
    <div class="brand">
      <img class="logo" src="${logoUrl}" alt="Digital360 logo" />
      <div>
        <div class="brand-title">Digital360</div>
        <div class="brand-sub">by BrunerDigital</div>
      </div>
    </div>
    <div class="content">
      <section class="copy">
        <div class="kicker"><i class="pulse"></i>${asset.kicker}</div>
        <h1>${highlight(asset.title)}</h1>
        <p class="body">${asset.body}</p>
        <div class="badge-row">
          <span class="badge">CRM</span>
          <span class="badge">Automation</span>
          <span class="badge">Inbox</span>
          <span class="badge">AI</span>
          <span class="badge">Reports</span>
        </div>
        <div class="cta">${asset.cta}<i class="arrow"></i></div>
      </section>
      <section class="visual">
        ${asset.layout === "carousel" ? renderDashboard(asset) : asset.layout === "square" || asset.layout === "story" ? renderOrb(asset) : renderDashboard(asset)}
      </section>
    </div>
    ${asset.metric ? `<div class="metric">${asset.metric}</div>` : ""}
  </div>
</body>
</html>`;
}

function highlight(title) {
  const words = ["connected.", "speed.", "OS", "stack.", "live.", "problem.", "fades.", "working.", "walkthrough."];
  let output = title;
  for (const word of words) {
    output = output.replace(word, `<span class="gradient">${word}</span>`);
  }
  return output;
}

function renderOrb(asset) {
  return `
    <div class="orb"></div>
    <div class="chip c1"><b>New leads</b><span>+1,250</span></div>
    <div class="chip c2"><b>Conversion rate</b><span>27.4%</span></div>
    <div class="chip c3"><b>Revenue tracked</b><span>$48,920</span></div>
  `;
}

function renderDashboard(asset) {
  const storyExtra = asset.layout === "story" ? "<div class=\"mini\"><b>AI insight</b><br />Follow up with high-intent leads first.</div><div class=\"mini\"><b>Launch path</b><br />7-14 days from setup to rollout.</div>" : "<div class=\"mini\"><b>AI insight</b><br />Top channels: referrals and paid search.</div><div class=\"mini\"><b>Next action</b><br />Book 14 open leads this week.</div>";
  const miniCards = asset.layout === "carousel" ? "" : `<div class="mini-cards">${storyExtra}</div>`;

  return `
    <div class="dashboard">
      <div class="dash-top"><span>Command Center</span><span>Live preview</span></div>
      <div class="dash-grid">
        <div class="stat"><small>Total revenue</small><strong>$48.9k</strong><span>+28.4%</span></div>
        <div class="stat"><small>New leads</small><strong>1,250</strong><span>+18.7%</span></div>
        <div class="stat"><small>Appointments</small><strong>342</strong><span>+22.1%</span></div>
      </div>
      <div class="chart">
        <svg class="line" viewBox="0 0 520 170" preserveAspectRatio="none">
          <path d="M0 128 C52 112 75 76 126 86 C176 96 198 44 244 58 C294 74 318 34 366 42 C420 51 454 30 520 14" fill="none" stroke="#34d399" stroke-width="5" />
          <path d="M0 146 C60 124 83 118 126 118 C178 118 210 92 256 100 C314 111 342 74 390 82 C446 91 474 61 520 48" fill="none" stroke="#2563eb" stroke-width="5" />
        </svg>
        <div class="bars">
          <i style="height:35%"></i><i style="height:52%"></i><i style="height:48%"></i><i style="height:70%"></i><i style="height:62%"></i><i style="height:86%"></i>
        </div>
      </div>
      ${miniCards}
    </div>
  `;
}
