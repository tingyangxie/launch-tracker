"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingCard } from "@/components/discover/trending-card";
import { HNCard } from "@/components/discover/hn-card";
import {
  useGitHubTrending,
  useHackerNews,
  type GitHubTimeRange,
} from "@/hooks/use-trending";

const LANGUAGES = [
  { value: "", label: "All Languages" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "c++", label: "C++" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "zig", label: "Zig" },
];

export default function DiscoverPage() {
  const [timeRange, setTimeRange] = useState<GitHubTimeRange>("weekly");
  const [language, setLanguage] = useState("");
  const [hnFilter, setHnFilter] = useState<"all" | "github" | "showhn">("all");

  const {
    repos,
    loading: ghLoading,
    error: ghError,
    refetch: ghRefetch,
  } = useGitHubTrending(timeRange, language);

  const {
    stories,
    loading: hnLoading,
    error: hnError,
    refetch: hnRefetch,
  } = useHackerNews(50);

  const filteredStories = stories.filter((s) => {
    if (hnFilter === "github") return s.isGitHub;
    if (hnFilter === "showhn") return s.isShowHN;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Discover</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find trending projects and one-click add them to your tracker.
        </p>
      </div>

      <Tabs defaultValue="github" className="space-y-4">
        <TabsList>
          <TabsTrigger value="github">GitHub Trending</TabsTrigger>
          <TabsTrigger value="hackernews">Hacker News</TabsTrigger>
        </TabsList>

        <TabsContent value="github" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={timeRange}
              onValueChange={(v) => setTimeRange(v as GitHubTimeRange)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Today</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={language || "all"}
              onValueChange={(v) => setLanguage(v === "all" ? "" : (v ?? ""))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.value || "all"} value={l.value || "all"}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={ghRefetch}
              disabled={ghLoading}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${ghLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {ghError && (
            <p className="text-sm text-destructive">Error: {ghError}</p>
          )}

          {ghLoading && (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          )}

          {!ghLoading && repos.length === 0 && !ghError && (
            <p className="py-8 text-center text-muted-foreground">
              No trending repos found for this filter.
            </p>
          )}

          {!ghLoading && (
            <div className="space-y-2">
              {repos.map((repo) => (
                <TrendingCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hackernews" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={hnFilter}
              onValueChange={(v) =>
                setHnFilter(v as "all" | "github" | "showhn")
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stories</SelectItem>
                <SelectItem value="github">GitHub Links</SelectItem>
                <SelectItem value="showhn">Show HN</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={hnRefetch}
              disabled={hnLoading}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${hnLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <span className="text-xs text-muted-foreground">
              {filteredStories.length} stories
            </span>
          </div>

          {hnError && (
            <p className="text-sm text-destructive">Error: {hnError}</p>
          )}

          {hnLoading && (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          )}

          {!hnLoading && filteredStories.length === 0 && !hnError && (
            <p className="py-8 text-center text-muted-foreground">
              No stories match this filter.
            </p>
          )}

          {!hnLoading && (
            <div className="space-y-2">
              {filteredStories.map((story) => (
                <HNCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
