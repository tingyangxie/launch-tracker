"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { DailyNote } from "@/lib/supabase/types";

export function NoteCard({ note }: { note: DailyNote }) {
  const date = parseISO(note.note_date);

  return (
    <Link href={`/notes/${note.note_date}`}>
      <Card className="transition-colors hover:border-[#0052ef]/70 hover:bg-accent/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-[1rem] font-[420] tracking-[-0.015em]">
                {format(date, "EEEE, MMMM d, yyyy")}
              </h3>
              <p className="mt-1 line-clamp-2 text-[0.88rem] text-muted-foreground">
                {note.content || "No content yet"}
              </p>
            </div>
            {note.release_ids.length > 0 && (
              <span className="lt-technical-label shrink-0">
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
