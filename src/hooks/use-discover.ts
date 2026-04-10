"use client";

import { useState, useEffect, useCallback } from "react";

export type DiscoverSource =
  | "github_trending"
  | "github_releases"
  | "hackernews"
  | "devto";

export interface DiscoverItem {
  id: string;
  source: DiscoverSource;
  title: string;
  description: string | null;
  url: string;
  secondaryUrl?: string;
  author: string;
  score: number;
  scoreLabel: string;
  commentCount?: number;
  language?: string;
  tags: string[];
  createdAt: string;
  // GitHub-specific
  repoFullName?: string;
  repoUrl?: string;
  homepage?: string;
  forks?: number;
}

interface UseDiscoverOptions {
  source: DiscoverSource | "all";
  timeRange?: string;
  language?: string;
  topic?: string;
  hnFilter?: string;
  hnQuery?: string;
  devtoTag?: string;
  devtoPeriod?: string;
}

export function useDiscover(options: UseDiscoverOptions) {
  const [items, setItems] = useState<DiscoverItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const sources: DiscoverSource[] =
        options.source === "all"
          ? ["github_trending", "hackernews", "devto", "github_releases"]
          : [options.source];

      const results = await Promise.allSettled(
        sources.map(async (src) => {
          let url: string;
          switch (src) {
            case "github_trending":
              url = `/api/discover/github-trending?timeRange=${options.timeRange || "weekly"}&language=${options.language || ""}`;
              break;
            case "github_releases":
              url = `/api/discover/github-releases?topic=${options.topic || ""}`;
              break;
            case "hackernews":
              url = `/api/discover/hackernews?filter=${options.hnFilter || "top"}&query=${encodeURIComponent(options.hnQuery || "")}`;
              break;
            case "devto":
              url = `/api/discover/reddit?tag=${options.devtoTag || ""}&period=${options.devtoPeriod || "week"}`;
              break;
          }
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to fetch ${src}`);
          const data = await res.json();
          return data.items as DiscoverItem[];
        })
      );

      const allItems: DiscoverItem[] = [];
      const errors: string[] = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          allItems.push(...result.value);
        } else {
          errors.push(result.reason?.message || "Unknown error");
        }
      }

      if (options.source === "all") {
        allItems.sort((a, b) => {
          const weight: Record<string, number> = {
            github_trending: 1,
            hackernews: 3,
            devto: 2,
            github_releases: 1,
          };
          const scoreA = a.score * (weight[a.source] || 1);
          const scoreB = b.score * (weight[b.source] || 1);
          return scoreB - scoreA;
        });
      }

      setItems(allItems);
      if (errors.length > 0 && allItems.length === 0) {
        setError(errors.join(", "));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [
    options.source,
    options.timeRange,
    options.language,
    options.topic,
    options.hnFilter,
    options.hnQuery,
    options.devtoTag,
    options.devtoPeriod,
  ]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
}
