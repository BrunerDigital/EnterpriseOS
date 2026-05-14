import Link from "next/link";
import { sendPasswordReset } from "@/app/forgot-password/actions";
import { BrunerLogo } from "@/components/app/bruner-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ForgotPasswordPageProps = {
  searchParams?: Promise<{ error?: string; sent?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 grid-fade">
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrunerLogo className="mb-2" subtitle="Secure account recovery" />
          <CardTitle className="text-3xl">Reset password</CardTitle>
          <CardDescription>Send a secure password reset link to an invited BrunerDigital user.</CardDescription>
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
            <Input name="email" placeholder="info@brunerdigital.com" type="email" autoComplete="email" required />
            <Button type="submit">Send reset link</Button>
            <Button asChild variant="outline">
              <Link href="/login">Back to login</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
