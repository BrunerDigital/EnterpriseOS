import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 grid-fade">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Sparkles />
          </div>
          <CardTitle className="text-3xl">EnterpriseOS</CardTitle>
          <CardDescription>Sign in to your white-label agency operating system.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="you@agency.com" type="email" />
          <Input placeholder="Password" type="password" />
          <Button asChild>
            <Link href="/dashboard">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/onboarding">Start demo onboarding</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
