"use client";

import Link from "next/link";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SOURCE_TYPES, CATEGORIES } from "@/lib/constants";
import type { ReleaseWithProduct } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

export function ReleaseCard({ release }: { release: ReleaseWithProduct }) {
  const source = SOURCE_TYPES[release.source_type];
  const category = CATEGORIES[release.category];

  return (
    <Card className="transition-colors hover:border-[#0052ef]/70 hover:bg-accent/50">
      <CardContent className="flex items-start gap-3 p-3">
        <div
          className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", source.dot)}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/releases/${release.id}`}
              className="text-[0.97rem] font-[420] leading-tight tracking-[-0.015em] hover:underline"
            >
              {release.title}
              {release.is_major && (
                <Star className="ml-1 inline h-3.5 w-3.5 text-amber-500" />
              )}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[0.76rem] text-muted-foreground">
            <span>{release.product_name}</span>
            {release.organization && (
              <>
                <span>·</span>
                <span>{release.organization}</span>
              </>
            )}
            {release.version && (
              <>
                <span>·</span>
                <span>{release.version}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-[10px]">
              {source.label}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {category.label}
            </Badge>
            {release.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
          {release.summary && (
            <p className="line-clamp-2 text-[0.84rem] text-muted-foreground">
              {release.summary}
            </p>
          )}
          <div className="flex gap-2 pt-1">
            {release.website_url && (
              <a
                href={release.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {release.repo_url && (
              <a
                href={release.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <GitBranch className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
