"use client";

import { useState } from "react";
import { Star, GitFork, ExternalLink, Plus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import type { TrendingRepo } from "@/hooks/use-trending";

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

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

export function TrendingCard({ repo }: { repo: TrendingRepo }) {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);

  async function handleImport() {
    setImporting(true);
    try {
      // Check if product already exists
      const { data: existing } = await supabase
        .from("products")
        .select("id")
        .eq("name", repo.name)
        .single();

      let productId: string;

      if (existing) {
        productId = existing.id;
      } else {
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name: repo.name,
            organization: repo.owner,
            source_type: "open_source",
            website_url: repo.homepage || null,
            repo_url: repo.url,
            description: repo.description,
          })
          .select()
          .single();

        if (productError) throw productError;
        productId = newProduct.id;
      }

      // Create a release entry for today
      const today = new Date().toISOString().split("T")[0];
      const { error: releaseError } = await supabase.from("releases").insert({
        product_id: productId,
        title: `${repo.name} — Trending on GitHub`,
        release_date: today,
        category: guessCategory(repo),
        summary: repo.description || `Trending repo with ${formatNumber(repo.stars)} stars.`,
        is_major: false,
        tags: [
          ...(repo.language ? [repo.language.toLowerCase()] : []),
          "trending",
          ...repo.topics.slice(0, 3),
        ],
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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline truncate"
              >
                {repo.full_name}
              </a>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {repo.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] || "bg-gray-400"}`}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {formatNumber(repo.stars)}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {formatNumber(repo.forks)}
              </span>
            </div>

            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 5).map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
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

function guessCategory(
  repo: TrendingRepo
): string {
  const text = `${repo.description || ""} ${repo.topics.join(" ")} ${repo.language || ""}`.toLowerCase();
  if (text.match(/\b(ai|ml|llm|gpt|model|neural|transformer|diffusion)\b/))
    return "ai_ml";
  if (text.match(/\b(react|vue|next|nuxt|svelte|angular|frontend|css|tailwind)\b/))
    return "web_framework";
  if (text.match(/\b(ios|android|flutter|react.native|mobile|swift|kotlin)\b/))
    return "mobile";
  if (text.match(/\b(database|sql|postgres|mysql|redis|mongo|sqlite)\b/))
    return "database";
  if (text.match(/\b(devtool|cli|linter|formatter|debug|test|bundler|build)\b/))
    return "devtools";
  if (text.match(/\b(rust|go|python|java|typescript|runtime|compiler|lang)\b/))
    return "language_runtime";
  if (text.match(/\b(security|auth|crypto|encrypt|firewall|vulnerability)\b/))
    return "security";
  if (text.match(/\b(cloud|docker|kubernetes|aws|infra|deploy|serverless)\b/))
    return "cloud_infra";
  if (text.match(/\b(design|figma|ui|ux|icon|font|theme)\b/)) return "design";
  return "other";
}
