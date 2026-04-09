"use client";

import { useState, useEffect, useCallback } from "react";
import { format, subDays } from "date-fns";

// ---- GitHub Trending (via Search API) ----

export interface TrendingRepo {
  id: number;
  full_name: string;
  name: string;
  owner: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
  homepage: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export type GitHubTimeRange = "daily" | "weekly" | "monthly";

export function useGitHubTrending(
  timeRange: GitHubTimeRange = "weekly",
  language: string = ""
) {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    setLoading(true);
    setError(null);

    const daysBack =
      timeRange === "daily" ? 1 : timeRange === "weekly" ? 7 : 30;
    const since = format(subDays(new Date(), daysBack), "yyyy-MM-dd");

    let query = `created:>${since} stars:>10`;
    if (language) {
      query += ` language:${language}`;
    }

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
      }

      const data = await res.json();
      const items: TrendingRepo[] = (data.items || []).map(
        (item: Record<string, unknown>) => ({
          id: item.id,
          full_name: item.full_name,
          name: item.name,
          owner: (item.owner as Record<string, unknown>)?.login ?? "",
          description: item.description,
          stars: item.stargazers_count,
          forks: item.forks_count,
          language: item.language,
          url: item.html_url,
          homepage: item.homepage,
          created_at: item.created_at,
          updated_at: item.updated_at,
          topics: item.topics ?? [],
        })
      );

      setRepos(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [timeRange, language]);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return { repos, loading, error, refetch: fetchTrending };
}

// ---- Hacker News ----

export interface HNStory {
  id: number;
  title: string;
  url: string | null;
  score: number;
  by: string;
  time: number;
  descendants: number;
  hnUrl: string;
  isGitHub: boolean;
  isShowHN: boolean;
}

export function useHackerNews(limit = 30) {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      if (!res.ok) throw new Error("Failed to fetch HN stories");
      const ids: number[] = await res.json();

      // Fetch top N stories in parallel
      const storyPromises = ids.slice(0, limit).map(async (id) => {
        const r = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return r.json();
      });

      const rawStories = await Promise.all(storyPromises);

      const parsed: HNStory[] = rawStories
        .filter((s) => s && s.type === "story" && s.url)
        .map((s) => ({
          id: s.id,
          title: s.title,
          url: s.url || null,
          score: s.score || 0,
          by: s.by || "",
          time: s.time || 0,
          descendants: s.descendants || 0,
          hnUrl: `https://news.ycombinator.com/item?id=${s.id}`,
          isGitHub: s.url
            ? s.url.includes("github.com") || s.url.includes("github.io")
            : false,
          isShowHN: s.title
            ? s.title.toLowerCase().startsWith("show hn")
            : false,
        }));

      setStories(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return { stories, loading, error, refetch: fetchStories };
}

// ---- GitHub Repo Releases (for one-click import) ----

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
}

export async function fetchGitHubReleases(
  owner: string,
  repo: string
): Promise<GitHubRelease[]> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=10`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
    }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}
