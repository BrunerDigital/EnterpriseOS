import Link from "next/link";
import { sendPasswordReset } from "@/app/forgot-password/actions";
import { BrunerLogo } from "@/components/app/bruner-logo";
import { AuthArtwork } from "@/components/app/auth-artwork";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ForgotPasswordPageProps = {
  searchParams?: Promise<{ error?: string; sent?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;

  return (
    <AuthArtwork>
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrunerLogo className="mb-2" />
          <h1 className="text-3xl font-semibold tracking-tight">Reset password</h1>
          <CardDescription>Send a secure password reset link to an invited Digital360 user.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={sendPasswordReset} className="flex flex-col gap-4">
            {params?.error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-100">
                {params.error}
              </div>
            ) : null}
            {params?.sent ? (
              <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
                If that email exists, a reset link is on the way.
              </div>
            ) : null}
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <Input name="email" placeholder="you@company.com" type="email" autoComplete="email" required />
            </label>
            <Button type="submit">Send reset link</Button>
            <Button asChild variant="outline">
              <Link href="/login">Back to login</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthArtwork>
  );
}
