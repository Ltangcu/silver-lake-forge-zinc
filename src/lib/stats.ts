import { addDays, isBefore, parseISO, startOfDay, toKey } from "@/lib/dates";
import type { Habit } from "@/lib/types";

export function checkKey(habitId: string, dateKey: string) {
  return `${habitId}:${dateKey}`;
}

export function isChecked(
  checks: Record<string, true>,
  habitId: string,
  dateKey: string,
) {
  return Boolean(checks[checkKey(habitId, dateKey)]);
}

function habitStart(habit: Habit, today: Date) {
  const created = startOfDay(parseISO(habit.createdAt));
  return isBefore(today, created) ? today : created;
}

export function currentStreak(
  habit: Habit,
  checks: Record<string, true>,
  today = startOfDay(new Date()),
) {
  const todayStr = toKey(today);
  let cursor = isChecked(checks, habit.id, todayStr) ? today : addDays(today, -1);
  const start = habitStart(habit, today);
  let n = 0;
  while (!isBefore(cursor, start)) {
    if (!isChecked(checks, habit.id, toKey(cursor))) break;
    n += 1;
    cursor = addDays(cursor, -1);
    if (n > 4000) break;
  }
  return n;
}

export function longestStreak(
  habit: Habit,
  checks: Record<string, true>,
  today = startOfDay(new Date()),
) {
  const start = habitStart(habit, today);
  let cursor = start;
  let run = 0;
  let best = 0;
  while (!isBefore(today, cursor)) {
    if (isChecked(checks, habit.id, toKey(cursor))) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 0;
    }
    cursor = addDays(cursor, 1);
    if (best > 4000) break;
  }
  return best;
}

export function completionInRange(
  habit: Habit,
  checks: Record<string, true>,
  days: Date[],
) {
  const start = habitStart(habit, startOfDay(new Date()));
  const eligible = days.filter((d) => !isBefore(d, start));
  if (eligible.length === 0) return { done: 0, total: 0, rate: 0 };
  const done = eligible.filter((d) => isChecked(checks, habit.id, toKey(d))).length;
  return { done, total: eligible.length, rate: done / eligible.length };
}

export function dayCompletion(
  habits: Habit[],
  checks: Record<string, true>,
  dateKey: string,
) {
  if (habits.length === 0) return { done: 0, total: 0, rate: 0 };
  const done = habits.filter((h) => isChecked(checks, h.id, dateKey)).length;
  return { done, total: habits.length, rate: done / habits.length };
}

export function perfectDayStreak(
  habits: Habit[],
  checks: Record<string, true>,
  today = startOfDay(new Date()),
) {
  if (habits.length === 0) return 0;
  const todayStr = toKey(today);
  const todayPerfect = dayCompletion(habits, checks, todayStr).rate === 1;
  let cursor = todayPerfect ? today : addDays(today, -1);
  let n = 0;
  while (n < 4000) {
    const key = toKey(cursor);
    const { rate, total } = dayCompletion(habits, checks, key);
    if (total === 0 || rate < 1) break;
    n += 1;
    cursor = addDays(cursor, -1);
  }
  return n;
}
