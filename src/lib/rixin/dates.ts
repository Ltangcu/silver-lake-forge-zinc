const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(key: string, n: number): string {
  const date = parseKey(key);
  date.setDate(date.getDate() + n);
  return todayKey(date);
}

export function weekdayIndex(key: string): number {
  return parseKey(key).getDay();
}

export function weekdayLabel(key: string): string {
  return WEEKDAYS[weekdayIndex(key)] ?? "";
}

export function formatLong(key: string): { monthDay: string; weekday: string } {
  const date = parseKey(key);
  return {
    monthDay: `${date.getMonth() + 1}月${date.getDate()}日`,
    weekday: `星期${WEEKDAYS[date.getDay()]}`,
  };
}

export function startOfWeek(key: string): string {
  return addDays(key, -weekdayIndex(key));
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function weekKeys(anchor: string): string[] {
  const start = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function lastNDays(end: string, n: number): string[] {
  return Array.from({ length: n }, (_, i) => addDays(end, -(n - 1 - i)));
}

export function monthGrid(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(year, monthIndex, 1);
  const pad = first.getDay();
  const count = daysInMonth(year, monthIndex);
  const cells: (string | null)[] = Array.from({ length: pad }, () => null);
  for (let d = 1; d <= count; d += 1) {
    cells.push(todayKey(new Date(year, monthIndex, d)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function hashToIndex(seed: string, modulo: number): number {
  if (modulo <= 0) return 0;
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h % modulo;
}
