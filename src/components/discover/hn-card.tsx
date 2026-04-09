"use client";

import { useState } from "react";
import { MessageSquare, ExternalLink, Plus, Loader2, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import type { HNStory } from "@/hooks/use-trending";

function timeAgo(unixTime: number): string {
  const seconds = Math.floor(Date.now() / 1000 - unixTime);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function HNCard({ story }: { story: HNStory }) {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);

  async function handleImport() {
    setImporting(true);
    try {
      // Extract a product name from the title
      let productName = story.title
        .replace(/^(Show HN|Ask HN|Tell HN):\s*/i, "")
        .split(/\s[–—-]\s/)[0]
        .trim();
      if (productName.length > 60) {
        productName = productName.slice(0, 57) + "...";
      }

      // Create product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: productName,
          source_type: story.isGitHub ? "open_source" : "community",
          website_url: story.url,
          description: story.title,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Create release
      const today = new Date().toISOString().split("T")[0];
      const { error: releaseError } = await supabase.from("releases").insert({
        product_id: product.id,
        title: story.title,
        release_date: today,
        category: "other",
        summary: `Trending on Hacker News with ${story.score} points.`,
        is_major: false,
        changelog_url: story.hnUrl,
        tags: [
          "hacker-news",
          ...(story.isShowHN ? ["show-hn"] : []),
          ...(story.isGitHub ? ["github"] : []),
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

  const domain = story.url
    ? new URL(story.url).hostname.replace("www.", "")
    : null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-start gap-2">
              <a
                href={story.url || story.hnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium leading-tight hover:underline"
              >
                {story.title}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <ArrowUp className="h-3 w-3" />
                {story.score}
              </span>
              <span className="flex items-center gap-0.5">
                <MessageSquare className="h-3 w-3" />
                {story.descendants}
              </span>
              <span>{timeAgo(story.time)}</span>
              {domain && (
                <span className="flex items-center gap-0.5">
                  <ExternalLink className="h-3 w-3" />
                  {domain}
                </span>
              )}
            </div>

            <div className="flex gap-1">
              {story.isShowHN && (
                <Badge className="bg-orange-500 text-[10px] text-white hover:bg-orange-600">
                  Show HN
                </Badge>
              )}
              {story.isGitHub && (
                <Badge variant="secondary" className="text-[10px]">
                  GitHub
                </Badge>
              )}
              <a
                href={story.hnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-500 hover:underline"
              >
                comments
              </a>
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
