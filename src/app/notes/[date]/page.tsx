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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {format(parsedDate, "EEEE, MMMM d, yyyy")}
        </h1>
      </div>

      <NoteEditor date={date} />

      <div className="space-y-3">
        <h3 className="font-medium">Releases on this day</h3>
        {loading && (
          <div className="h-20 animate-pulse rounded-lg bg-muted" />
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
