export const HABIT_COLORS = [
  "pine",
  "clay",
  "tea",
  "ink",
  "mist",
  "brick",
] as const;

export type HabitColor = (typeof HABIT_COLORS)[number];

export type Habit = {
  id: string;
  name: string;
  note: string;
  color: HabitColor;
  createdAt: string;
};

export type Checks = Record<string, Record<string, true>>;

export type QuoteCategory = "idiom" | "verse" | "aphorism" | "elegant";

export type Quote = {
  id: string;
  text: string;
  pinyin: string;
  meaning: string;
  usage: string;
  source: string;
  category: QuoteCategory;
};

export type QuoteMeta = {
  favorites: string[];
  known: string[];
  extraId: string | null;
};

export type RixinState = {
  habits: Habit[];
  checks: Checks;
  quotes: QuoteMeta;
};
