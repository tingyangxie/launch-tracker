"use client";

import { useState, useCallback, useMemo } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToPrevMonth = useCallback(
    () => setCurrentMonth((m) => subMonths(m, 1)),
    []
  );
  const goToNextMonth = useCallback(
    () => setCurrentMonth((m) => addMonths(m, 1)),
    []
  );
  const goToToday = useCallback(() => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  }, []);

  const { monthStart, monthEnd, calendarStart, calendarEnd, days } = useMemo(() => {
    const ms = startOfMonth(currentMonth);
    const me = endOfMonth(currentMonth);
    const cs = startOfWeek(ms);
    const ce = endOfWeek(me);
    return {
      monthStart: ms,
      monthEnd: me,
      calendarStart: cs,
      calendarEnd: ce,
      days: eachDayOfInterval({ start: cs, end: ce }),
    };
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDate,
    setSelectedDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    days,
    monthStart,
    monthEnd,
    calendarStart,
    calendarEnd,
  };
}
