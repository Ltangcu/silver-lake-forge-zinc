import { addDays, lastNDays, todayKey } from "./dates";
import type { Checks, Habit } from "./types";

export function isChecked(checks: Checks, habitId: string, day: string): boolean {
  return Boolean(checks[habitId]?.[day]);
}

export function dayCompleted(habits: Habit[], checks: Checks, day: string): boolean {
  if (habits.length === 0) return false;
  return habits.every((h) => isChecked(checks, h.id, day));
}

export function currentStreak(habits: Habit[], checks: Checks, end = todayKey()): number {
  if (habits.length === 0) return 0;
  let cursor = end;
  if (!dayCompleted(habits, checks, cursor)) {
    cursor = addDays(cursor, -1);
  }
  let n = 0;
  while (dayCompleted(habits, checks, cursor)) {
    n += 1;
    cursor = addDays(cursor, -1);
    if (n > 4000) break;
  }
  return n;
}

export function habitCurrentStreak(habitId: string, checks: Checks, end = todayKey()): number {
  let cursor = end;
  if (!isChecked(checks, habitId, cursor)) {
    cursor = addDays(cursor, -1);
  }
  let n = 0;
  while (isChecked(checks, habitId, cursor)) {
    n += 1;
    cursor = addDays(cursor, -1);
    if (n > 4000) break;
  }
  return n;
}

export function habitLongestStreak(habitId: string, checks: Checks): number {
  const days = Object.keys(checks[habitId] ?? {}).sort();
  if (days.length === 0) return 0;
  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i += 1) {
    if (days[i] === addDays(days[i - 1]!, 1)) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

export function completionRate(
  habits: Habit[],
  checks: Checks,
  end = todayKey(),
  window = 14,
): number {
  if (habits.length === 0) return 0;
  const days = lastNDays(end, window);
  const possible = days.length * habits.length;
  if (possible === 0) return 0;
  let done = 0;
  for (const day of days) {
    for (const h of habits) {
      if (isChecked(checks, h.id, day)) done += 1;
    }
  }
  return done / possible;
}

export function todayDoneCount(habits: Habit[], checks: Checks, day = todayKey()): number {
  return habits.filter((h) => isChecked(checks, h.id, day)).length;
}
