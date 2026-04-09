"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { DailyNote } from "@/lib/supabase/types";

export function useNote(date: string) {
  const [note, setNote] = useState<DailyNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchNote = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("daily_notes")
      .select("*")
      .eq("note_date", date)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching note:", error);
    }
    setNote(data as DailyNote | null);
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const saveNote = useCallback(
    async (content: string, releaseIds?: string[]) => {
      setSaving(true);
      const payload = {
        note_date: date,
        content,
        ...(releaseIds !== undefined && { release_ids: releaseIds }),
      };

      const { data, error } = await supabase
        .from("daily_notes")
        .upsert(payload, { onConflict: "note_date" })
        .select()
        .single();

      if (error) {
        console.error("Error saving note:", error);
      } else {
        setNote(data as DailyNote);
      }
      setSaving(false);
    },
    [date]
  );

  const debouncedSave = useCallback(
    (content: string, releaseIds?: string[]) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveNote(content, releaseIds);
      }, 1500);
    },
    [saveNote]
  );

  return { note, loading, saving, saveNote, debouncedSave, refetch: fetchNote };
}

export function useRecentNotes(limit = 10) {
  const [notes, setNotes] = useState<DailyNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("daily_notes")
        .select("*")
        .order("note_date", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching notes:", error);
      } else {
        setNotes(data as DailyNote[]);
      }
      setLoading(false);
    }
    fetch();
  }, [limit]);

  return { notes, loading };
}
