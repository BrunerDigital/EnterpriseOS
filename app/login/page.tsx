import Link from "next/link";
import { signIn } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BrunerLogo } from "@/components/app/bruner-logo";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 grid-fade">
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrunerLogo className="mb-2" subtitle="Client command center" />
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your white-label agency operating system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="flex flex-col gap-4">
            {params?.error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-100">
                {params.error}
              </div>
            ) : null}
            <Input name="email" placeholder="info@brunerdigital.com" type="email" autoComplete="email" required />
            <Input name="password" placeholder="Password" type="password" autoComplete="current-password" required />
            <Button type="submit">Sign in</Button>
            <Button asChild variant="outline">
              <Link href="/forgot-password">Forgot password?</Link>
            </Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Access is invite-only while BrunerDigital is in private launch. Demo onboarding remains available after
              signing in.
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
