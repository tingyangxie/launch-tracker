"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type {
  ReleaseWithProduct,
  ReleaseCategory,
  ReleaseSource,
} from "@/lib/supabase/types";
import { format } from "date-fns";

interface UseReleasesOptions {
  startDate?: Date;
  endDate?: Date;
  category?: ReleaseCategory | null;
  sourceType?: ReleaseSource | null;
  search?: string;
}

export function useReleases(options: UseReleasesOptions = {}) {
  const { startDate, endDate, category, sourceType, search } = options;
  const [releases, setReleases] = useState<ReleaseWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Stabilize date dependencies as strings to prevent infinite re-render loops
  const startStr = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const endStr = endDate ? format(endDate, "yyyy-MM-dd") : "";

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("releases_with_product").select("*");

    if (startStr) {
      query = query.gte("release_date", startStr);
    }
    if (endStr) {
      query = query.lte("release_date", endStr);
    }
    if (category) {
      query = query.eq("category", category);
    }
    if (sourceType) {
      query = query.eq("source_type", sourceType);
    }
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    query = query.order("release_date", { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching releases:", error);
    } else {
      setReleases(data as ReleaseWithProduct[]);
    }
    setLoading(false);
  }, [startStr, endStr, category, sourceType, search]);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  const releasesByDate = releases.reduce(
    (acc, release) => {
      const date = release.release_date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(release);
      return acc;
    },
    {} as Record<string, ReleaseWithProduct[]>
  );

  return { releases, releasesByDate, loading, refetch: fetchReleases };
}
