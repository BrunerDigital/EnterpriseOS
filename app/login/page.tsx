import Link from "next/link";
import { signIn } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BrunerLogo } from "@/components/app/bruner-logo";
import { AuthArtwork } from "@/components/app/auth-artwork";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <AuthArtwork>
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrunerLogo className="mb-2" />
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <CardDescription>Sign in to Digital360 by BrunerDigital.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="flex flex-col gap-4">
            {params?.error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-100">
                {params.error}
              </div>
            ) : null}
            <input type="hidden" name="next" value={params?.next ?? "/dashboard"} />
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <Input name="email" placeholder="you@company.com" type="email" autoComplete="email" required />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Password
              <Input name="password" type="password" autoComplete="current-password" required />
            </label>
            <Button type="submit">Sign in</Button>
            <Button asChild variant="outline">
              <Link href="/forgot-password">Forgot password?</Link>
            </Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Access is invite-only while Digital360 is in private launch. Demo onboarding remains available after
              signing in.
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthArtwork>
  );
}
