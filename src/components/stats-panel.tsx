import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { lastNDays, toKey } from "@/lib/dates";
import {
  completionInRange,
  currentStreak,
  dayCompletion,
  longestStreak,
  perfectDayStreak,
} from "@/lib/stats";
import { useStore } from "@/lib/store";
import { HABIT_COLOR_CLASS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatsPanel() {
  const habits = useStore((s) => s.habits);
  const checks = useStore((s) => s.checks);
  const days14 = useMemo(() => lastNDays(14), []);
  const days30 = useMemo(() => lastNDays(30), []);

  const chart = days14.map((d) => {
    const { rate, done, total } = dayCompletion(habits, checks, toKey(d));
    return {
      key: toKey(d),
      label: format(d, "d"),
      rate: Math.round(rate * 100),
      done,
      total,
    };
  });

  const perfect = perfectDayStreak(habits, checks);
  const today = dayCompletion(habits, checks, toKey(new Date()));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-2xl font-medium tracking-tight">统计</h1>
        <p className="mt-1 text-sm text-muted">看连续，也看完成的密度。</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="今日完成" value={`${today.done}/${today.total || 0}`} />
        <Stat label="全勤连续" value={`${perfect} 天`} />
        <Stat
          className="col-span-2 md:col-span-1"
          label="近三十日均"
          value={
            habits.length
              ? `${Math.round(
                  (days30.reduce((a, d) => a + dayCompletion(habits, checks, toKey(d)).rate, 0) /
                    days30.length) *
                    100,
                )}%`
              : "—"
          }
        />
      </div>

      <section className="rounded-xl bg-bg-elevated p-4 shadow-card">
        <h2 className="mb-3 text-sm font-medium text-muted">近十四日完成率</h2>
        {habits.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">完成几次打卡后，这里会出现柱状图。</p>
        ) : (
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} barCategoryGap="18%">
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "var(--color-surface)" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const row = payload[0].payload as (typeof chart)[number];
                    return (
                      <div className="rounded-md bg-bg-elevated px-3 py-2 text-xs shadow-card">
                        {row.done}/{row.total} · {row.rate}%
                      </div>
                    );
                  }}
                />
                <Bar dataKey="rate" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted">每项习惯</h2>
        {habits.length === 0 ? (
          <p className="text-sm text-muted">还没有习惯可统计。</p>
        ) : (
          habits.map((habit) => {
            const color = HABIT_COLOR_CLASS[habit.color];
            const cur = currentStreak(habit, checks);
            const longest = longestStreak(habit, checks);
            const month = completionInRange(habit, checks, days30);
            return (
              <article
                key={habit.id}
                className="rounded-xl bg-bg-elevated p-4 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("size-2.5 rounded-full", color.bg)} />
                  <h3 className="font-medium">{habit.name}</h3>
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <dt className="text-xs text-muted">当前连续</dt>
                    <dd className="mt-1 font-serif text-xl tabular">{cur}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">最长连续</dt>
                    <dd className="mt-1 font-serif text-xl tabular">{longest}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">近三十日</dt>
                    <dd className="mt-1 font-serif text-xl tabular">
                      {Math.round(month.rate * 100)}%
                    </dd>
                  </div>
                </dl>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className={cn("h-full rounded-full", color.bg)}
                    style={{ width: `${Math.round(month.rate * 100)}%` }}
                  />
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-bg-elevated p-4 shadow-card", className)}>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl tabular">{value}</p>
    </div>
  );
}
