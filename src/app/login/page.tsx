"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function LoginPage() {
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
      window.location.href = "/calendar";
    } else {
      setError("Invalid code");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-3">
          <CalendarDays className="h-8 w-8 text-white" />
          <h1 className="text-2xl tracking-[-0.03em] text-white" style={{ fontSize: "1.5rem", lineHeight: 1.2 }}>
            Launch Tracker
          </h1>
          <p className="text-sm text-[#797979]">Enter access code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            autoFocus
            className="w-full rounded-[3px] border border-[#212121] bg-[#0b0b0b] px-3 py-2.5 text-[#b9b9b9] placeholder-[#797979] outline-none transition-colors focus:border-[#0052ef] focus:bg-[#072227]"
          />

          {error && (
            <p className="text-sm text-[#dd0000]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full rounded-[99999px] bg-[#f36458] px-4 py-2.5 text-white transition-colors hover:bg-[#0052ef] disabled:opacity-50"
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
