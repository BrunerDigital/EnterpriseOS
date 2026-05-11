import { AppShell } from "@/components/app/app-shell";
import { ModulePage } from "@/components/app/module-page";
import { modules } from "@/lib/demo-data";

export default function Page() {
  return <AppShell><ModulePage module={{ ...modules.ai, title: "Conversations inbox", description: "Two-way inbox foundation for email, SMS, social-style messages, AI reply suggestions, sentiment, and assignment.", primaryAction: "Reply with AI", items: ["Maya Thompson - SMS", "Jon Bell - Email", "Atlas MedSpa - Social", "Evergreen HVAC - Email"], stats: ["312 open threads", "9 min avg reply", "84% resolved"] }} /></AppShell>;
}
