"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { DailyNote } from "@/lib/supabase/types";

export function NoteCard({ note }: { note: DailyNote }) {
  const date = parseISO(note.note_date);

  return (
    <Link href={`/notes/${note.note_date}`}>
      <Card className="transition-colors hover:bg-accent/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium">
                {format(date, "EEEE, MMMM d, yyyy")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {note.content || "No content yet"}
              </p>
            </div>
            {note.release_ids.length > 0 && (
              <span className="shrink-0 text-xs text-muted-foreground">
                {note.release_ids.length} release
                {note.release_ids.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
