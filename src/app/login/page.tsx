"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/calendar";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      window.location.href = next.startsWith("/") ? next : "/calendar";
      return;
    }

    setError("Invalid code");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="access-code" className="lt-technical-label">
          Access Code
        </label>
        <Input
          id="access-code"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          autoComplete="off"
          aria-invalid={error ? true : undefined}
        />
        {error ? (
          <p className="text-xs tracking-[-0.01em] text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={loading || !code} className="w-full">
        {loading ? "Signing in…" : "Continue"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[22rem]">
        <div className="mb-10 flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 text-[0.95rem] font-medium tracking-[-0.02em] text-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Launch Tracker</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[1.75rem] font-[420] leading-[1.08] tracking-[-0.035em] text-foreground">
              Sign in
            </h1>
            <p className="text-sm tracking-[-0.012em] text-muted-foreground">
              Enter your access code to continue.
            </p>
          </div>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="lt-technical-label mt-10">
          Private · Access required
        </p>
      </div>
    </div>
  );
}
