import {
  addDays,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
} from "date-fns";
import { zhCN } from "date-fns/locale";

export function toKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function fromKey(key: string) {
  return parseISO(key);
}

export function todayKey() {
  return toKey(new Date());
}

export function formatLong(date: Date) {
  return format(date, "M月d日 EEEE", { locale: zhCN });
}

export function formatMonth(date: Date) {
  return format(date, "yyyy年M月", { locale: zhCN });
}

export function formatWeekRange(anchor: Date) {
  const start = startOfWeek(anchor, { weekStartsOn: 1 });
  const end = endOfWeek(anchor, { weekStartsOn: 1 });
  return `${format(start, "M月d日", { locale: zhCN })} – ${format(end, "M月d日", { locale: zhCN })}`;
}

export function weekdayLabels() {
  return ["一", "二", "三", "四", "五", "六", "日"];
}

export function monthGrid(anchor: Date) {
  const start = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}

export function weekDays(anchor: Date) {
  const start = startOfWeek(anchor, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function isFutureDay(date: Date, today = startOfDay(new Date())) {
  return isAfter(startOfDay(date), today);
}

export function isPastOrToday(date: Date, today = startOfDay(new Date())) {
  return !isFutureDay(date, today);
}

export function daysSince(iso: string, until = startOfDay(new Date())) {
  const start = startOfDay(parseISO(iso));
  if (isAfter(start, until)) return 1;
  let n = 0;
  let cursor = start;
  while (!isAfter(cursor, until)) {
    n += 1;
    cursor = addDays(cursor, 1);
    if (n > 4000) break;
  }
  return n;
}

export function lastNDays(n: number, until = startOfDay(new Date())) {
  return Array.from({ length: n }, (_, i) => addDays(until, -(n - 1 - i)));
}

export { addDays, isSameDay, startOfDay, startOfMonth, isBefore, parseISO };
