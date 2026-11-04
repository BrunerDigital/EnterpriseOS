import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ service: "digital360", status: "ok", phase: "private_launch", database: "not_checked" }, { headers: { "Cache-Control": "no-store" } });
}
