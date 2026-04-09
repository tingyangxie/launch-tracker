"use client";

import { useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscoverCard } from "@/components/discover/discover-card";
import { useDiscover, type DiscoverItem } from "@/hooks/use-discover";

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

const TOPICS = [
  { value: "", label: "All Topics" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "web", label: "Web" },
  { value: "devops", label: "DevOps" },
  { value: "security", label: "Security" },
  { value: "database", label: "Database" },
  { value: "cli", label: "CLI Tools" },
  { value: "api", label: "APIs" },
  { value: "framework", label: "Frameworks" },
];

const SUBREDDITS = [
  { value: "all", label: "All Subreddits" },
  { value: "programming", label: "r/programming" },
  { value: "sideproject", label: "r/SideProject" },
  { value: "webdev", label: "r/webdev" },
  { value: "selfhosted", label: "r/selfhosted" },
  { value: "opensource", label: "r/opensource" },
  { value: "ml", label: "r/MachineLearning" },
];

// --- Sub-tab components ---

function AllSourcesTab() {
  const { items, loading, error, refetch } = useDiscover({ source: "all" });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh All
        </Button>
        <span className="text-xs text-muted-foreground">
          {items.length} items from 4 sources
        </span>
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

function GitHubTrendingTab() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [language, setLanguage] = useState("");

  const { items, loading, error, refetch } = useDiscover({
    source: "github_trending",
    timeRange,
    language,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={timeRange} onValueChange={(v) => v && setTimeRange(v)}>
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
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <span className="text-xs text-muted-foreground">
          {items.length} repos
        </span>
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

function GitHubReleasesTab() {
  const [topic, setTopic] = useState("");

  const { items, loading, error, refetch } = useDiscover({
    source: "github_releases",
    topic,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={topic || "all"}
          onValueChange={(v) => setTopic(v === "all" ? "" : (v ?? ""))}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Topics" />
          </SelectTrigger>
          <SelectContent>
            {TOPICS.map((t) => (
              <SelectItem key={t.value || "all"} value={t.value || "all"}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <span className="text-xs text-muted-foreground">
          {items.length} active repos
        </span>
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

function HackerNewsTab() {
  const [filter, setFilter] = useState("top");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { items, loading, error, refetch } = useDiscover({
    source: "hackernews",
    hnFilter: filter,
    hnQuery: query,
  });

  function handleSearch() {
    setQuery(searchInput);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filter} onValueChange={(v) => v && setFilter(v)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top Stories</SelectItem>
            <SelectItem value="show_hn">Show HN</SelectItem>
            <SelectItem value="launches">Launches</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search HN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-9 w-48 pl-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            setQuery(searchInput);
            refetch();
          }}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <span className="text-xs text-muted-foreground">
          {items.length} stories
        </span>
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

function RedditTab() {
  const [subreddit, setSubreddit] = useState("all");
  const [sort, setSort] = useState("hot");

  const { items, loading, error, refetch } = useDiscover({
    source: "reddit",
    subreddit,
    redditSort: sort,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={subreddit} onValueChange={(v) => v && setSubreddit(v)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUBREDDITS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => v && setSort(v)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="top">Top</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <span className="text-xs text-muted-foreground">
          {items.length} posts
        </span>
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

// --- Shared list renderer ---

function ItemList({
  items,
  loading,
  error,
}: {
  items: DiscoverItem[];
  loading: boolean;
  error: string | null;
}) {
  if (error)
    return <p className="text-sm text-destructive">Error: {error}</p>;
  if (loading)
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  if (items.length === 0)
    return (
      <p className="py-8 text-center text-muted-foreground">
        No items found for this filter.
      </p>
    );
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <DiscoverCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// --- Main page ---

export default function DiscoverPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Discover</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find trending projects across GitHub, Hacker News, and Reddit.
          One-click import to your tracker.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Sources</TabsTrigger>
          <TabsTrigger value="github">GitHub Trending</TabsTrigger>
          <TabsTrigger value="releases">Active Repos</TabsTrigger>
          <TabsTrigger value="hackernews">Hacker News</TabsTrigger>
          <TabsTrigger value="reddit">Reddit</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllSourcesTab />
        </TabsContent>
        <TabsContent value="github">
          <GitHubTrendingTab />
        </TabsContent>
        <TabsContent value="releases">
          <GitHubReleasesTab />
        </TabsContent>
        <TabsContent value="hackernews">
          <HackerNewsTab />
        </TabsContent>
        <TabsContent value="reddit">
          <RedditTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
