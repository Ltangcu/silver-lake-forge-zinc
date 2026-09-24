export const HABIT_COLORS = [
  { id: "pine", label: "松" },
  { id: "clay", label: "陶" },
  { id: "slate", label: "青" },
  { id: "moss", label: "苔" },
  { id: "ink", label: "墨" },
  { id: "sea", label: "海" },
  { id: "rust", label: "朱" },
  { id: "stone", label: "石" },
] as const;

export type HabitColor = (typeof HABIT_COLORS)[number]["id"];

export type Habit = {
  id: string;
  name: string;
  note: string;
  color: HabitColor;
  createdAt: string;
};

export type LexiconKind = "verse" | "idiom" | "word" | "quote";

export type LexiconEntry = {
  id: string;
  kind: LexiconKind;
  text: string;
  subtext?: string;
  pinyin: string;
  meaning: string;
  usage: string;
  source: string;
};

export const KIND_LABEL: Record<LexiconKind, string> = {
  verse: "诗句",
  idiom: "成语",
  word: "雅词",
  quote: "名言",
};

export const HABIT_COLOR_CLASS: Record<
  HabitColor,
  { bg: string; text: string; ring: string; soft: string }
> = {
  pine: {
    bg: "bg-habit-pine",
    text: "text-habit-pine",
    ring: "ring-habit-pine",
    soft: "bg-habit-pine/12",
  },
  clay: {
    bg: "bg-habit-clay",
    text: "text-habit-clay",
    ring: "ring-habit-clay",
    soft: "bg-habit-clay/12",
  },
  slate: {
    bg: "bg-habit-slate",
    text: "text-habit-slate",
    ring: "ring-habit-slate",
    soft: "bg-habit-slate/12",
  },
  moss: {
    bg: "bg-habit-moss",
    text: "text-habit-moss",
    ring: "ring-habit-moss",
    soft: "bg-habit-moss/12",
  },
  ink: {
    bg: "bg-habit-ink",
    text: "text-habit-ink",
    ring: "ring-habit-ink",
    soft: "bg-habit-ink/12",
  },
  sea: {
    bg: "bg-habit-sea",
    text: "text-habit-sea",
    ring: "ring-habit-sea",
    soft: "bg-habit-sea/12",
  },
  rust: {
    bg: "bg-habit-rust",
    text: "text-habit-rust",
    ring: "ring-habit-rust",
    soft: "bg-habit-rust/12",
  },
  stone: {
    bg: "bg-habit-stone",
    text: "text-habit-stone",
    ring: "ring-habit-stone",
    soft: "bg-habit-stone/12",
  },
};
