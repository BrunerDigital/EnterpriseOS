import { NextResponse } from "next/server";

type AiRequest = {
  task?: string;
  context?: string;
  module?: string;
};

export async function POST(request: Request) {
  let payload: AiRequest;

  try {
    payload = (await request.json()) as AiRequest;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid AI request payload." }, { status: 400 });
  }

  const task = typeof payload.task === "string" && payload.task.trim().length > 0 ? payload.task.trim() : "Recommend the next best growth action.";
  const context = typeof payload.context === "string" ? payload.context.trim() : "";
  const moduleName = typeof payload.module === "string" ? payload.module.trim() : "Digital360";
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return NextResponse.json({
      success: true,
      live: false,
      model: "deterministic-fallback",
      output: fallbackRecommendation(moduleName, task, context)
    });
  }

  const expectedToken = process.env.AI_ASSISTANT_API_TOKEN;
  const suppliedToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || suppliedToken !== expectedToken) {
    return NextResponse.json(
      {
        success: false,
        message: "AI assistant live mode requires AI_ASSISTANT_API_TOKEN."
      },
      { status: 401 }
    );
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions:
        "You are Digital360's concise operating assistant. Return practical recommendations for CRM, follow-up, booking, reporting, reputation, billing, and launch operations. Avoid unsupported claims.",
      input: [
        `Module: ${moduleName}`,
        `Task: ${task}`,
        context ? `Context: ${context}` : "Context: No extra context supplied."
      ].join("\n"),
      max_output_tokens: 700
    })
  });

  if (!response.ok) {
    return NextResponse.json({ success: false, message: `OpenAI returned ${response.status}.` }, { status: 502 });
  }

  const data = (await response.json()) as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };

  return NextResponse.json({
    success: true,
    live: true,
    model,
    output: data.output_text ?? data.output?.flatMap((item) => item.content ?? []).map((item) => item.text).filter(Boolean).join("\n") ?? ""
  });
}

function fallbackRecommendation(module: string, task: string, context: string) {
  const contextLine = context ? ` Based on the supplied context, start with the highest-intent lead source and owner queue.` : "";

  return [
    `${module}: ${task}`,
    `${contextLine} Recommended next action: prioritize speed-to-lead, assign an owner, create a follow-up task, and route the lead into the correct pipeline stage.`,
    "Production note: add OPENAI_API_KEY and AI_ASSISTANT_API_TOKEN to enable live model responses."
  ].join("\n\n");
}
