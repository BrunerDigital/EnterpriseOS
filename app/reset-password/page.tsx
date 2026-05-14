"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { BrunerLogo } from "@/components/app/bruner-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError(null);
      setMessage(null);

      const password = String(formData.get("password") ?? "");
      const confirmPassword = String(formData.get("confirmPassword") ?? "");

      if (password.length < 8) {
        setError("Use at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError("This reset link is invalid or expired. Request a new link and try again.");
        return;
      }

      setMessage("Password updated. You can now sign in.");
    });
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 grid-fade">
      <Card className="w-full max-w-md">
        <CardHeader>
          <BrunerLogo className="mb-2" subtitle="Secure account recovery" />
          <CardTitle className="text-3xl">Choose a new password</CardTitle>
          <CardDescription>Set a fresh password for your BrunerDigital account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">
            {error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            ) : null}
            {message ? (
              <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
                {message}
              </div>
            ) : null}
            <Input name="password" placeholder="New password" type="password" autoComplete="new-password" required />
            <Input
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              autoComplete="new-password"
              required
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update password"}
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Back to login</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
