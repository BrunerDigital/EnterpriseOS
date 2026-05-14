import { getAppSession } from "@/lib/auth/session";
import { AppShellClient } from "@/components/app/app-shell-client";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();

  return <AppShellClient session={session}>{children}</AppShellClient>;
}
