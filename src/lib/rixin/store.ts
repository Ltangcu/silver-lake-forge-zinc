import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todayKey } from "./dates";
import type { Habit, HabitColor, QuoteMeta, RixinState } from "./types";

const DEFAULT_HABITS: Habit[] = [
  {
    id: "chen-du",
    name: "晨读",
    note: "读一页书，或把今日词句读出声",
    color: "tea",
    createdAt: "2026-01-01",
  },
  {
    id: "zao-qi",
    name: "早起",
    note: "按自己的节奏起身，不比谁更早",
    color: "clay",
    createdAt: "2026-01-01",
  },
  {
    id: "zou-dong",
    name: "走动",
    note: "散步、拉伸，出门也算",
    color: "pine",
    createdAt: "2026-01-01",
  },
  {
    id: "luo-bi",
    name: "落笔",
    note: "写下三句，不求长，求真",
    color: "ink",
    createdAt: "2026-01-01",
  },
];

const DEFAULT_QUOTES: QuoteMeta = {
  favorites: [],
  known: [],
  extraId: null,
};

function uid(): string {
  return `h_${Math.random().toString(36).slice(2, 10)}`;
}

type Actions = {
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  toggleCheck: (habitId: string, day?: string) => void;
  addHabit: (input: { name: string; note: string; color: HabitColor }) => void;
  updateHabit: (id: string, input: { name: string; note: string; color: HabitColor }) => void;
  deleteHabit: (id: string) => void;
  toggleFavorite: (quoteId: string) => void;
  toggleKnown: (quoteId: string) => void;
  setExtraQuote: (quoteId: string | null) => void;
  replaceState: (next: RixinState) => void;
};

export const useRixinStore = create<RixinState & Actions>()(
  persist(
    (set, get) => ({
      habits: DEFAULT_HABITS,
      checks: {},
      quotes: DEFAULT_QUOTES,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      toggleCheck: (habitId, day = todayKey()) => {
        const checks = { ...get().checks };
        const row = { ...(checks[habitId] ?? {}) };
        if (row[day]) delete row[day];
        else row[day] = true;
        if (Object.keys(row).length === 0) delete checks[habitId];
        else checks[habitId] = row;
        set({ checks });
      },
      addHabit: (input) => {
        const name = input.name.trim();
        if (!name) return;
        const habit: Habit = {
          id: uid(),
          name,
          note: input.note.trim(),
          color: input.color,
          createdAt: todayKey(),
        };
        set({ habits: [...get().habits, habit] });
      },
      updateHabit: (id, input) => {
        const name = input.name.trim();
        if (!name) return;
        set({
          habits: get().habits.map((h) =>
            h.id === id ? { ...h, name, note: input.note.trim(), color: input.color } : h,
          ),
        });
      },
      deleteHabit: (id) => {
        const checks = { ...get().checks };
        delete checks[id];
        set({ habits: get().habits.filter((h) => h.id !== id), checks });
      },
      toggleFavorite: (quoteId) => {
        const quotes = { ...get().quotes };
        const has = quotes.favorites.includes(quoteId);
        quotes.favorites = has
          ? quotes.favorites.filter((id) => id !== quoteId)
          : [...quotes.favorites, quoteId];
        set({ quotes });
      },
      toggleKnown: (quoteId) => {
        const quotes = { ...get().quotes };
        const has = quotes.known.includes(quoteId);
        quotes.known = has
          ? quotes.known.filter((id) => id !== quoteId)
          : [...quotes.known, quoteId];
        set({ quotes });
      },
      setExtraQuote: (quoteId) => {
        set({ quotes: { ...get().quotes, extraId: quoteId } });
      },
      replaceState: (next) => {
        set({
          habits: next.habits,
          checks: next.checks,
          quotes: { ...DEFAULT_QUOTES, ...next.quotes },
        });
      },
    }),
    {
      name: "rixin-v1",
      skipHydration: true,
      partialize: (s) => ({
        habits: s.habits,
        checks: s.checks,
        quotes: s.quotes,
      }),
    },
  ),
);
