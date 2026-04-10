"use client";

import { useState } from "react";
import {
  Star,
  GitFork,
  ExternalLink,
  Plus,
  Loader2,
  ArrowUp,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import type { DiscoverItem } from "@/hooks/use-discover";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Rust: "bg-orange-600",
  Go: "bg-cyan-500",
  Java: "bg-red-500",
  "C++": "bg-pink-500",
  C: "bg-gray-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-500",
  Ruby: "bg-red-600",
  PHP: "bg-indigo-400",
  Dart: "bg-teal-500",
  Zig: "bg-amber-500",
};

const SOURCE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  github_trending: {
    label: "GitHub",
    className: "bg-[#1c1c20] text-[#e0e0e6] hover:bg-[#0052ef] hover:text-white",
  },
  github_releases: {
    label: "Active",
    className: "bg-[#0052ef] text-white hover:bg-[#0a43b8]",
  },
  hackernews: {
    label: "HN",
    className: "bg-[#f36458] text-white hover:bg-[#ea4f41]",
  },
  devto: {
    label: "Dev.to",
    className: "bg-[#2a2a30] text-[#e0e0e6] hover:bg-[#0052ef] hover:text-white",
  },
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function guessCategory(item: DiscoverItem): string {
  const text =
    `${item.description || ""} ${item.tags.join(" ")} ${item.language || ""} ${item.title}`.toLowerCase();
  if (
    text.match(
      /\b(ai|ml|llm|gpt|model|neural|transformer|diffusion|deep.?learning)\b/
    )
  )
    return "ai_ml";
  if (
    text.match(
      /\b(react|vue|next|nuxt|svelte|angular|frontend|css|tailwind|web)\b/
    )
  )
    return "web_framework";
  if (
    text.match(/\b(ios|android|flutter|react.native|mobile|swift|kotlin)\b/)
  )
    return "mobile";
  if (
    text.match(
      /\b(database|sql|postgres|mysql|redis|mongo|sqlite|supabase)\b/
    )
  )
    return "database";
  if (
    text.match(
      /\b(devtool|cli|linter|formatter|debug|test|bundler|build|editor|ide)\b/
    )
  )
    return "devtools";
  if (
    text.match(
      /\b(rust|go|python|java|typescript|runtime|compiler|lang|zig)\b/
    )
  )
    return "language_runtime";
  if (
    text.match(
      /\b(security|auth|crypto|encrypt|firewall|vulnerability|oauth)\b/
    )
  )
    return "security";
  if (
    text.match(
      /\b(cloud|docker|kubernetes|aws|infra|deploy|serverless|terraform)\b/
    )
  )
    return "cloud_infra";
  if (text.match(/\b(design|figma|ui|ux|icon|font|theme)\b/)) return "design";
  return "other";
}

export function DiscoverCard({ item }: { item: DiscoverItem }) {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const style = SOURCE_STYLES[item.source];

  async function handleImport() {
    setImporting(true);
    try {
      let productName = item.title
        .replace(/^(Show HN|Ask HN|Tell HN):\s*/i, "")
        .split(/\s[--]\s/)[0]
        .trim();
      if (productName.length > 60) productName = productName.slice(0, 57) + "...";

      const isGitHub =
        !!item.repoUrl || item.url.includes("github.com");

      // Check existing product
      const { data: existing } = await supabase
        .from("products")
        .select("id")
        .eq("name", item.repoFullName || productName)
        .single();

      let productId: string;
      if (existing) {
        productId = existing.id;
      } else {
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name: item.repoFullName || productName,
            organization: item.author,
            source_type: isGitHub
              ? "open_source"
              : item.source === "hackernews"
                ? "community"
                : "other",
            website_url: item.homepage || (isGitHub ? null : item.url),
            repo_url: item.repoUrl || (isGitHub ? item.url : null),
            description: item.description,
          })
          .select()
          .single();
        if (productError) throw productError;
        productId = newProduct.id;
      }

      const today = new Date().toISOString().split("T")[0];
      const sourceLabel: Record<string, string> = {
        github_trending: "GitHub Trending",
        github_releases: "GitHub Active",
        hackernews: "Hacker News",
        devto: "Dev.to",
      };

      const { error: releaseError } = await supabase.from("releases").insert({
        product_id: productId,
        title: `${item.repoFullName || productName} -- Spotted on ${sourceLabel[item.source]}`,
        release_date: today,
        category: guessCategory(item),
        summary:
          item.description ||
          `Discovered on ${sourceLabel[item.source]} with ${formatNumber(item.score)} ${item.scoreLabel}.`,
        is_major: false,
        tags: [
          item.source.replace("_", "-"),
          ...(item.language ? [item.language.toLowerCase()] : []),
          ...item.tags.filter(Boolean).slice(0, 3),
        ],
        changelog_url: item.secondaryUrl || null,
      });

      if (releaseError) throw releaseError;
      setImported(true);
    } catch (err) {
      console.error("Import failed:", err);
      alert("Failed to import. Check console.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <Card className="transition-colors hover:border-[#0052ef]/70 hover:bg-accent/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-[10px] shrink-0 ${style.className}`}>
                {style.label}
              </Badge>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-[0.98rem] font-[420] tracking-[-0.015em] hover:underline"
              >
                {item.title}
              </a>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {item.description && (
              <p className="line-clamp-2 text-[0.88rem] text-muted-foreground">
                {item.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {item.language && (
                <span className="flex items-center gap-1">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${LANGUAGE_COLORS[item.language] || "bg-gray-400"}`}
                  />
                  {item.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                {item.source.startsWith("github") ? (
                  <Star className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" />
                )}
                {formatNumber(item.score)}
              </span>
              {item.forks != null && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {formatNumber(item.forks)}
                </span>
              )}
              {item.commentCount != null && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {item.commentCount}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo(item.createdAt)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {item.tags
                .filter(Boolean)
                .slice(0, 5)
                .map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              {item.secondaryUrl && (
                <a
                  href={item.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-xs text-blue-500 hover:underline"
                >
                  {item.source === "hackernews"
                    ? "discussion"
                    : "link"}
                </a>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant={imported ? "secondary" : "outline"}
            className="shrink-0 gap-1"
            onClick={handleImport}
            disabled={importing || imported}
          >
            {importing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : imported ? (
              "Added"
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                Track
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
