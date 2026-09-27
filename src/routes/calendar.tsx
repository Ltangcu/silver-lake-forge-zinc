import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/rixin/app-shell";
import { HabitDot } from "@/components/rixin/habit-form";
import { Button } from "@/components/ui/button";
import {
  addDays,
  monthGrid,
  todayKey,
  weekKeys,
  weekdayLabel,
} from "@/lib/rixin/dates";
import { dayCompleted, isChecked } from "@/lib/rixin/stats";
import { useRixinStore } from "@/lib/rixin/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  const today = todayKey();
  const [mode, setMode] = useState<"week" | "month">("week");
  const [cursor, setCursor] = useState(today);
  const habits = useRixinStore((s) => s.habits);
  const checks = useRixinStore((s) => s.checks);
  const toggleCheck = useRixinStore((s) => s.toggleCheck);

  const week = weekKeys(cursor);
  const date = new Date(cursor + "T12:00:00");
  const year = date.getFullYear();
  const month = date.getMonth();
  const cells = monthGrid(year, month);

  return (
    <AppShell active="/calendar">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">日历</h1>
          <p className="mt-1 text-sm text-ink-faint">
            {mode === "week" ? "每项习惯一行" : "有打卡的日子才亮点"}
          </p>
        </div>
        <div className="flex rounded-lg bg-paper-2 p-1">
          <button
            type="button"
            className={cn(
              "h-9 rounded-md px-3 text-sm",
              mode === "week" ? "bg-paper-1 text-ink" : "text-ink-soft",
            )}
            onClick={() => setMode("week")}
          >
            周视图
          </button>
          <button
            type="button"
            className={cn(
              "h-9 rounded-md px-3 text-sm",
              mode === "month" ? "bg-paper-1 text-ink" : "text-ink-soft",
            )}
            onClick={() => setMode("month")}
          >
            月视图
          </button>
        </div>
      </header>

      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="iconSm"
          aria-label="上一段"
          onClick={() =>
            setCursor(mode === "week" ? addDays(cursor, -7) : addDays(cursor, -30))
          }
        >
          <ChevronLeft className="size-4" />
        </Button>
        <p className="text-sm tabular-nums text-ink-soft">
          {mode === "week"
            ? `${week[0]} 至 ${week[6]}`
            : `${year}年${month + 1}月`}
        </p>
        <Button
          variant="outline"
          size="iconSm"
          aria-label="下一段"
          onClick={() =>
            setCursor(mode === "week" ? addDays(cursor, 7) : addDays(cursor, 30))
          }
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {mode === "week" ? (
        <div className="overflow-x-auto rounded-2xl border border-line bg-paper-1 p-3">
          <div
            className="grid min-w-[520px] gap-2"
            style={{ gridTemplateColumns: "7rem repeat(7, minmax(0, 1fr))" }}
          >
            <div />
            {week.map((d) => (
              <div key={d} className="text-center text-xs text-ink-faint">
                {weekdayLabel(d)}
                <div className="tabular-nums">{d.slice(8)}</div>
              </div>
            ))}
            {habits.map((habit) => (
              <div key={habit.id} className="contents">
                <div className="flex items-center gap-2 truncate text-sm">
                  <HabitDot color={habit.color} />
                  {habit.name}
                </div>
                {week.map((d) => {
                  const on = isChecked(checks, habit.id, d);
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-label={`${habit.name} ${d}`}
                      onClick={() => toggleCheck(habit.id, d)}
                      className={cn(
                        "mx-auto size-9 rounded-lg border",
                        on
                          ? "border-accent bg-accent"
                          : "border-line bg-paper hover:border-ink-faint",
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-paper-1 p-4">
          <div className="mb-2 grid grid-cols-7 text-center text-xs text-ink-faint">
            {["日", "一", "二", "三", "四", "五", "六"].map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} />;
              const full = dayCompleted(habits, checks, d);
              const any = habits.some((h) => isChecked(checks, h.id, d));
              const isToday = d === today;
              return (
                <div
                  key={d}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-lg text-sm tabular-nums",
                    isToday && "ring-1 ring-accent/40",
                    full && "bg-accent text-accent-fg",
                    any && !full && "bg-paper-2",
                  )}
                >
                  {d.slice(8)}
                  {any && !full ? (
                    <span className="mt-0.5 size-1 rounded-full bg-accent" />
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-faint">实心为全勤，小点为部分完成。</p>
        </div>
      )}
    </AppShell>
  );
}
