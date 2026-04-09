"use client";

import { format } from "date-fns";
import { useCalendar } from "@/hooks/use-calendar";
import { useReleases } from "@/hooks/use-releases";
import { CalendarHeader } from "./calendar-header";
import { CalendarCell } from "./calendar-cell";
import { ReleaseCard } from "@/components/releases/release-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid() {
  const {
    currentMonth,
    selectedDate,
    setSelectedDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    days,
    calendarStart,
    calendarEnd,
  } = useCalendar();

  const { releasesByDate, loading } = useReleases({
    startDate: calendarStart,
    endDate: calendarEnd,
  });

  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const selectedReleases = selectedDateStr
    ? releasesByDate[selectedDateStr] || []
    : [];

  return (
    <div className="space-y-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />

      {loading && (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      )}

      {!loading && (
        <div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-1 text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              return (
                <CalendarCell
                  key={dateStr}
                  date={day}
                  currentMonth={currentMonth}
                  isSelected={selectedDateStr === dateStr}
                  releases={releasesByDate[dateStr] || []}
                  onClick={setSelectedDate}
                />
              );
            })}
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h3>
            <Link href={`/notes/${format(selectedDate, "yyyy-MM-dd")}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <NotebookPen className="h-4 w-4" />
                Notes
              </Button>
            </Link>
          </div>
          {selectedReleases.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No releases on this day.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
