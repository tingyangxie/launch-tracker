"use client";

import { useState, useEffect } from "react";
import { useNote } from "@/hooks/use-notes";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";

interface NoteEditorProps {
  date: string;
}

export function NoteEditor({ date }: NoteEditorProps) {
  const { note, loading, saving, debouncedSave } = useNote(date);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  function handleChange(value: string) {
    setContent(value);
    debouncedSave(value);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading notes...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Daily Notes</h3>
        {saving ? (
          <Badge variant="secondary" className="gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Saving...
          </Badge>
        ) : note ? (
          <Badge variant="secondary" className="gap-1">
            <Check className="h-3 w-3" />
            Saved
          </Badge>
        ) : null}
      </div>
      <Textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your testing notes, comparisons, and observations for today..."
        rows={10}
        className="resize-y font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Notes auto-save as you type. Supports plain text.
      </p>
    </div>
  );
}
