"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReleaseCard } from "@/components/releases/release-card";
import { ReleaseFilters } from "@/components/releases/release-filters";
import { useReleases } from "@/hooks/use-releases";
import type { ReleaseCategory, ReleaseSource } from "@/lib/supabase/types";

export default function ReleasesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ReleaseCategory | null>(null);
  const [sourceType, setSourceType] = useState<ReleaseSource | null>(null);

  const { releases, loading } = useReleases({
    search: search || undefined,
    category,
    sourceType,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Releases</h1>
        <Link href="/releases/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Release
          </Button>
        </Link>
      </div>

      <ReleaseFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sourceType={sourceType}
        onSourceTypeChange={setSourceType}
      />

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {!loading && releases.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No releases found.</p>
          <Link href="/releases/new" className="mt-2 inline-block">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add your first release
            </Button>
          </Link>
        </div>
      )}

      {!loading && releases.length > 0 && (
        <div className="space-y-2">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}
    </div>
  );
}
