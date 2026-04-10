"use client";

import { use } from "react";
import { format, parseISO } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteEditor } from "@/components/notes/note-editor";
import { useReleases } from "@/hooks/use-releases";
import { ReleaseCard } from "@/components/releases/release-card";

export default function NoteDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);
  const parsedDate = parseISO(date);

  const { releases, loading } = useReleases({
    startDate: parsedDate,
    endDate: parsedDate,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/notes">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="lt-section-title">
          {format(parsedDate, "EEEE, MMMM d, yyyy")}
        </h1>
      </div>

      <NoteEditor date={date} />

      <div className="space-y-3">
        <h3 className="text-[1rem] font-[420] tracking-[-0.015em]">Releases on this day</h3>
        {loading && (
          <div className="h-20 animate-pulse rounded-[6px] border border-border bg-card" />
        )}
        {!loading && releases.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No releases on this day.
          </p>
        )}
        {!loading &&
          releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
      </div>
    </div>
  );
}
