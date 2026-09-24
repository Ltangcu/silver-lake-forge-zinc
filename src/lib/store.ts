import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { uid } from "@/lib/utils";
import { checkKey } from "@/lib/stats";
import type { Habit, HabitColor } from "@/lib/types";

const nowIso = () => new Date().toISOString();

const DEFAULT_HABITS: Habit[] = [
  {
    id: "seed-read",
    name: "晨读",
    note: "读一页书，或把今日词句读出声",
    color: "pine",
    createdAt: "2026-09-20T00:00:00.000Z",
  },
  {
    id: "seed-rise",
    name: "早起",
    note: "按自己的节奏起身，不比谁更早",
    color: "clay",
    createdAt: "2026-09-20T00:00:00.000Z",
  },
  {
    id: "seed-move",
    name: "走动",
    note: "散步、拉伸，出门也算",
    color: "sea",
    createdAt: "2026-09-20T00:00:00.000Z",
  },
  {
    id: "seed-write",
    name: "落笔",
    note: "写下三句，不求长，求真",
    color: "ink",
    createdAt: "2026-09-20T00:00:00.000Z",
  },
];

type State = {
  habits: Habit[];
  checks: Record<string, true>;
  savedWordIds: string[];
  learnedWordIds: string[];
};

type Actions = {
  addHabit: (input: { name: string; note: string; color: HabitColor }) => void;
  updateHabit: (id: string, input: { name: string; note: string; color: HabitColor }) => void;
  deleteHabit: (id: string) => void;
  toggleCheck: (habitId: string, dateKey: string) => void;
  toggleSaved: (id: string) => void;
  toggleLearned: (id: string) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      habits: DEFAULT_HABITS,
      checks: {},
      savedWordIds: [],
      learnedWordIds: [],
      addHabit: ({ name, note, color }) => {
        const habit: Habit = {
          id: uid(),
          name: name.trim(),
          note: note.trim(),
          color,
          createdAt: nowIso(),
        };
        set({ habits: [...get().habits, habit] });
      },
      updateHabit: (id, { name, note, color }) => {
        set({
          habits: get().habits.map((h) =>
            h.id === id ? { ...h, name: name.trim(), note: note.trim(), color } : h,
          ),
        });
      },
      deleteHabit: (id) => {
        const checks = { ...get().checks };
        for (const key of Object.keys(checks)) {
          if (key.startsWith(`${id}:`)) delete checks[key];
        }
        set({
          habits: get().habits.filter((h) => h.id !== id),
          checks,
        });
      },
      toggleCheck: (habitId, dateKey) => {
        const key = checkKey(habitId, dateKey);
        const checks = { ...get().checks };
        if (checks[key]) delete checks[key];
        else checks[key] = true;
        set({ checks });
      },
      toggleSaved: (id) => {
        const cur = get().savedWordIds;
        set({
          savedWordIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      toggleLearned: (id) => {
        const cur = get().learnedWordIds;
        set({
          learnedWordIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
    }),
    {
      name: "rixin-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        habits: s.habits,
        checks: s.checks,
        savedWordIds: s.savedWordIds,
        learnedWordIds: s.learnedWordIds,
      }),
      skipHydration: true,
    },
  ),
);
