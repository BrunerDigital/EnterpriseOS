"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function loginRedirect(message: string) {
  redirect(`/login?error=${encodeURIComponent(message)}`);
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    loginRedirect("Enter your email and password.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    loginRedirect("Those credentials did not match an active account.");
  }

  redirect("/dashboard");
}
