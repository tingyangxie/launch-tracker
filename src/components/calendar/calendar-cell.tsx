"use client";

import { format, isToday, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { ReleaseDot } from "./release-dot";
import type { ReleaseWithProduct } from "@/lib/supabase/types";

interface CalendarCellProps {
  date: Date;
  currentMonth: Date;
  isSelected: boolean;
  releases: ReleaseWithProduct[];
  onClick: (date: Date) => void;
}

export function CalendarCell({
  date,
  currentMonth,
  isSelected,
  releases,
  onClick,
}: CalendarCellProps) {
  const inMonth = isSameMonth(date, currentMonth);
  const today = isToday(date);

  return (
    <button
      onClick={() => onClick(date)}
      className={cn(
        "flex h-20 flex-col items-start gap-1 rounded-[6px] border border-border bg-card p-1.5 text-left text-sm tracking-[-0.01em] transition-colors hover:border-[#0052ef] hover:bg-accent",
        !inMonth && "opacity-30",
        isSelected && "border-primary bg-accent",
        today && !isSelected && "border-[#55beff]"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
          today && "bg-primary text-primary-foreground"
        )}
      >
        {format(date, "d")}
      </span>
      {releases.length > 0 && (
        <div className="flex flex-wrap gap-0.5">
          {releases.slice(0, 4).map((r) => (
            <ReleaseDot key={r.id} sourceType={r.source_type} />
          ))}
          {releases.length > 4 && (
            <span className="text-[10px] text-muted-foreground">
              +{releases.length - 4}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
