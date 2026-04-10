"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/notes/note-card";
import { useRecentNotes } from "@/hooks/use-notes";
import { format } from "date-fns";

export default function NotesPage() {
  const { notes, loading } = useRecentNotes(20);
  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <p className="lt-technical-label">Notes</p>
          <h1 className="lt-page-title">Daily Capture</h1>
          <p className="lt-page-description">
            Keep context beside each launch day so decisions and follow-ups never get
            lost.
          </p>
        </div>
        <Link href={`/notes/${todayStr}`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Today&apos;s Notes
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-[6px] border border-border bg-card" />
          ))}
        </div>
      )}

      {!loading && notes.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No notes yet.</p>
          <Link href={`/notes/${todayStr}`} className="mt-2 inline-block">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Start writing today
            </Button>
          </Link>
        </div>
      )}

      {!loading && notes.length > 0 && (
        <div className="space-y-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
