import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/rixin/app-shell";
import { HabitDot } from "@/components/rixin/habit-form";
import { Button } from "@/components/ui/button";
import {
  completionRate,
  currentStreak,
  habitCurrentStreak,
  habitLongestStreak,
} from "@/lib/rixin/stats";
import { useRixinStore } from "@/lib/rixin/store";
import type { RixinState } from "@/lib/rixin/types";

export const Route = createFileRoute("/stats")({ component: StatsPage });

function StatsPage() {
  const habits = useRixinStore((s) => s.habits);
  const checks = useRixinStore((s) => s.checks);
  const quotes = useRixinStore((s) => s.quotes);
  const replaceState = useRixinStore((s) => s.replaceState);
  const streak = currentStreak(habits, checks);
  const rate = Math.round(completionRate(habits, checks) * 100);

  const exportData = () => {
    const payload: RixinState = { habits, checks, quotes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rixin-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (file: File | undefined) => {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as RixinState;
      if (!Array.isArray(data.habits)) return;
      replaceState({
        habits: data.habits,
        checks: data.checks ?? {},
        quotes: data.quotes ?? { favorites: [], known: [], extraId: null },
      });
    } catch {
      /* ignore malformed files */
    }
  };

  return (
    <AppShell active="/stats">
      <header className="mb-6">
        <h1 className="font-display text-3xl">统计</h1>
        <p className="mt-1 text-sm text-ink-faint">全勤连续、近十四日完成率、每项当前与最长连续。</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-paper-1 p-4">
          <p className="text-xs text-ink-faint">全勤连续</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{streak}</p>
          <p className="text-xs text-ink-faint">天</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper-1 p-4">
          <p className="text-xs text-ink-faint">近十四日</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{rate}%</p>
          <p className="text-xs text-ink-faint">完成率</p>
        </div>
      </div>

      <ul className="mt-6 flex flex-col gap-2">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper-1 px-4 py-3"
          >
            <p className="flex items-center gap-2">
              <HabitDot color={habit.color} />
              {habit.name}
            </p>
            <p className="text-sm tabular-nums text-ink-soft">
              当前 {habitCurrentStreak(habit.id, checks)} · 最长{" "}
              {habitLongestStreak(habit.id, checks)}
            </p>
          </li>
        ))}
      </ul>

      <section className="mt-8 rounded-2xl border border-line bg-paper-1 p-4">
        <h2 className="font-display text-lg">本机备份</h2>
        <p className="mt-1 text-sm text-ink-faint">
          记录只保存在这台设备的这个浏览器里。换电脑前请导出。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={exportData}>导出</Button>
          <label className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-line bg-paper-1 px-4 text-sm">
            导入
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                void importData(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </section>
    </AppShell>
  );
}
