import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/rixin/app-shell";
import { HabitDot, HabitFormDialog } from "@/components/rixin/habit-form";
import { QuoteCard } from "@/components/rixin/quote-card";
import { Button } from "@/components/ui/button";
import { formatLong, hashToIndex, todayKey } from "@/lib/rixin/dates";
import { QUOTES } from "@/lib/rixin/quotes";
import { isChecked, todayDoneCount } from "@/lib/rixin/stats";
import { useRixinStore } from "@/lib/rixin/store";
import type { Habit } from "@/lib/rixin/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const day = todayKey();
  const { monthDay, weekday } = formatLong(day);
  const habits = useRixinStore((s) => s.habits);
  const checks = useRixinStore((s) => s.checks);
  const quotesMeta = useRixinStore((s) => s.quotes);
  const toggleCheck = useRixinStore((s) => s.toggleCheck);
  const addHabit = useRixinStore((s) => s.addHabit);
  const updateHabit = useRixinStore((s) => s.updateHabit);
  const deleteHabit = useRixinStore((s) => s.deleteHabit);
  const toggleFavorite = useRixinStore((s) => s.toggleFavorite);
  const toggleKnown = useRixinStore((s) => s.toggleKnown);
  const setExtraQuote = useRixinStore((s) => s.setExtraQuote);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Habit | null>(null);

  const dailyQuote = QUOTES[hashToIndex(day, QUOTES.length)] ?? QUOTES[0]!;
  const quote =
    QUOTES.find((q) => q.id === quotesMeta.extraId) ?? dailyQuote;

  const done = todayDoneCount(habits, checks, day);

  const another = () => {
    const pool = QUOTES.filter((q) => q.id !== quote.id);
    const next = pool[Math.floor(Math.random() * pool.length)];
    if (next) setExtraQuote(next.id);
  };

  const header = useMemo(() => ({ monthDay, weekday }), [monthDay, weekday]);

  return (
    <AppShell active="/">
      <header className="mb-6">
        <p className="text-sm text-ink-faint">
          {header.monthDay} {header.weekday}
        </p>
        <h1 className="mt-1 font-display text-3xl">今日</h1>
      </header>

      <QuoteCard
        quote={quote}
        favorited={quotesMeta.favorites.includes(quote.id)}
        known={quotesMeta.known.includes(quote.id)}
        onFavorite={() => toggleFavorite(quote.id)}
        onKnown={() => toggleKnown(quote.id)}
        onAnother={another}
      />

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl">日课</h2>
            <p className="text-sm text-ink-faint tabular-nums">
              {done} / {habits.length} 已完成
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="size-4" />
            添加
          </Button>
        </div>
        <ul className="flex flex-col gap-2">
          {habits.map((habit) => {
            const checked = isChecked(checks, habit.id, day);
            return (
              <li key={habit.id}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border border-line bg-paper-1 p-3",
                    checked && "bg-paper-2/70",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleCheck(habit.id, day)}
                    aria-pressed={checked}
                    aria-label={`${checked ? "取消" : "完成"} ${habit.name}`}
                    className={cn(
                      "size-11 shrink-0 rounded-xl border-2 transition-colors duration-(--motion-quick)",
                      checked
                        ? "border-accent bg-accent"
                        : "border-line bg-paper-1 hover:border-ink-faint",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-medium">
                      <HabitDot color={habit.color} />
                      {habit.name}
                      <span className="text-xs font-normal text-ink-faint">
                        {checked ? "已完成" : "待开始"}
                      </span>
                    </p>
                    {habit.note ? (
                      <p className="truncate text-sm text-ink-faint">{habit.note}</p>
                    ) : null}
                  </div>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    aria-label={`编辑 ${habit.name}`}
                    onClick={() => {
                      setEditing(habit);
                      setFormOpen(true);
                    }}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        {habits.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-faint">
            还没有习惯。先加一件小事。
          </p>
        ) : null}
      </section>

      <HabitFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        habit={editing}
        onSubmit={(v) => {
          if (editing) updateHabit(editing.id, v);
          else addHabit(v);
        }}
        onDelete={editing ? () => deleteHabit(editing.id) : undefined}
      />
    </AppShell>
  );
}
