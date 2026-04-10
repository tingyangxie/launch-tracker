"use client";

import { CalendarGrid } from "@/components/calendar/calendar-grid";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="lt-technical-label">Calendar</p>
        <h1 className="lt-page-title">Release Calendar</h1>
        <p className="lt-page-description">
          Watch launches by day, inspect what shipped, and jump directly into notes
          for each date.
        </p>
      </div>
      <CalendarGrid />
    </div>
  );
}
