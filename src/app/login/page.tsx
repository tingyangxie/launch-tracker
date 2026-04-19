"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Access code"
        autoFocus
        autoComplete="off"
        className="w-full rounded-[3px] border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
      />

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <Button type="submit" disabled={loading || !code} className="w-full">
        {loading ? "..." : "Enter"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-3">
          <CalendarDays className="h-7 w-7 text-foreground" />
          <h1 className="text-[1.5rem] font-medium tracking-[-0.03em] text-foreground">
            Launch Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter access code to continue
          </p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
