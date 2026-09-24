import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, addWeeks, format, isSameDay, isSameMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  formatMonth,
  formatWeekRange,
  isFutureDay,
  monthGrid,
  toKey,
  weekDays,
  weekdayLabels,
} from "@/lib/dates";
import { dayCompletion, isChecked } from "@/lib/stats";
import { useStore } from "@/lib/store";
import { HABIT_COLOR_CLASS, type Habit } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Mode = "week" | "month";

export function CalendarBoard() {
  const habits = useStore((s) => s.habits);
  const checks = useStore((s) => s.checks);
  const toggleCheck = useStore((s) => s.toggleCheck);
  const [mode, setMode] = useState<Mode>("month");
  const [anchor, setAnchor] = useState(() => new Date());
  const [selected, setSelected] = useState(() => toKey(new Date()));
  const today = useMemo(() => new Date(), []);

  function shift(dir: -1 | 1) {
    setAnchor((d) => (mode === "week" ? addWeeks(d, dir) : addMonths(d, dir)));
  }

  const selectedDate = new Date(`${selected}T12:00:00`);
  const selectedLocked = isFutureDay(selectedDate, today);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-medium tracking-tight">日历</h1>
          <p className="mt-1 text-sm text-muted">
            {mode === "week" ? formatWeekRange(anchor) : formatMonth(anchor)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Segmented
            value={mode}
            onChange={(v) => {
              setMode(v);
              setAnchor(new Date());
            }}
          />
          <div className="flex">
            <Button variant="ghost" size="icon-sm" onClick={() => shift(-1)} aria-label="上一页">
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const now = new Date();
                setAnchor(now);
                setSelected(toKey(now));
              }}
            >
              今天
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => shift(1)} aria-label="下一页">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      {mode === "month" ? (
        <MonthGrid
          anchor={anchor}
          today={today}
          selected={selected}
          habits={habits}
          checks={checks}
          onSelect={setSelected}
        />
      ) : (
        <WeekGrid
          anchor={anchor}
          today={today}
          selected={selected}
          habits={habits}
          checks={checks}
          onSelect={setSelected}
          onToggle={toggleCheck}
        />
      )}

      <section className="rounded-xl bg-bg-elevated p-4 shadow-card">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-medium">
            {isSameDay(selectedDate, today) ? "这一天" : format(selectedDate, "M月d日")}
          </h2>
          <p className="text-sm text-muted">
            {selectedLocked
              ? "尚未到来"
              : habits.length === 0
                ? "还没有习惯"
                : `${dayCompletion(habits, checks, selected).done} / ${habits.length} 完成`}
          </p>
        </div>
        {habits.length === 0 ? (
          <p className="text-sm text-muted">先立一条日课，格子才会亮起来。</p>
        ) : (
          <ul className="space-y-2">
            {habits.map((habit) => {
              const on = isChecked(checks, habit.id, selected);
              const color = HABIT_COLOR_CLASS[habit.color];
              return (
                <li key={habit.id}>
                  <button
                    type="button"
                    disabled={selectedLocked}
                    onClick={() => toggleCheck(habit.id, selected)}
                    className={cn(
                      "flex h-12 w-full items-center gap-3 rounded-md px-2 text-left transition-colors duration-150",
                      selectedLocked ? "opacity-40" : "hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-sm border",
                        on ? cn(color.bg, "border-transparent text-accent-fg") : "border-border bg-bg",
                      )}
                    >
                      <Check className={cn("size-4", on ? "opacity-100" : "opacity-0")} />
                    </span>
                    <span className="flex-1">{habit.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <div className="flex rounded-md bg-surface p-1">
      {(["week", "month"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={cn(
            "h-8 rounded-sm px-3 text-sm transition-colors duration-150",
            value === m ? "bg-bg-elevated text-fg shadow-card" : "text-muted",
          )}
        >
          {m === "week" ? "周" : "月"}
        </button>
      ))}
    </div>
  );
}

function MonthGrid({
  anchor,
  today,
  selected,
  habits,
  checks,
  onSelect,
}: {
  anchor: Date;
  today: Date;
  selected: string;
  habits: Habit[];
  checks: Record<string, true>;
  onSelect: (key: string) => void;
}) {
  const days = monthGrid(anchor);
  const labels = weekdayLabels();

  return (
    <div className="rounded-xl bg-bg-elevated p-3 shadow-card md:p-4">
      <div className="mb-2 grid grid-cols-7">
        {labels.map((d) => (
          <div key={d} className="py-1 text-center text-xs text-muted">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toKey(day);
          const inMonth = isSameMonth(day, anchor);
          const { rate, done } = dayCompletion(habits, checks, key);
          const future = isFutureDay(day, today);
          const isToday = isSameDay(day, today);
          const isSel = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center rounded-md py-1 transition-colors duration-150",
                !inMonth && "opacity-30",
                isSel && "bg-surface",
                isToday && !isSel && "ring-1 ring-border-strong",
                future && "cursor-default",
              )}
            >
              <span className={cn("text-sm tabular", isToday && "font-medium text-accent")}>
                {format(day, "d")}
              </span>
              <span className="mt-0.5 flex h-2 items-center gap-0.5">
                {habits
                  .filter((h) => isChecked(checks, h.id, key))
                  .slice(0, 4)
                  .map((h) => (
                    <i
                      key={h.id}
                      className={cn("block size-1.5 rounded-full", HABIT_COLOR_CLASS[h.color].bg)}
                    />
                  ))}
              </span>
              {habits.length > 0 && done > 0 ? (
                <span className="sr-only">{Math.round(rate * 100)}% 完成</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekGrid({
  anchor,
  today,
  selected,
  habits,
  checks,
  onSelect,
  onToggle,
}: {
  anchor: Date;
  today: Date;
  selected: string;
  habits: Habit[];
  checks: Record<string, true>;
  onSelect: (key: string) => void;
  onToggle: (habitId: string, dateKey: string) => void;
}) {
  const days = weekDays(anchor);
  const labels = weekdayLabels();

  return (
    <div className="overflow-x-auto rounded-xl bg-bg-elevated p-3 shadow-card md:p-4">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `minmax(4.5rem, 7rem) repeat(7, minmax(2.5rem, 1fr))` }}
      >
        <div />
        {days.map((day, i) => {
          const key = toKey(day);
          const isToday = isSameDay(day, today);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                "flex flex-col items-center rounded-md py-1 text-xs",
                key === selected && "bg-surface",
              )}
            >
              <span className="text-muted">{labels[i]}</span>
              <span className={cn("tabular", isToday && "font-medium text-accent")}>
                {format(day, "d")}
              </span>
            </button>
          );
        })}

        {habits.length === 0 ? (
          <p className="col-span-8 py-6 text-center text-sm text-muted">还没有习惯。</p>
        ) : (
          habits.map((habit) => {
            const color = HABIT_COLOR_CLASS[habit.color];
            return (
              <div key={habit.id} className="contents">
                <div className="flex items-center truncate pr-2 text-sm">{habit.name}</div>
                {days.map((day) => {
                  const key = toKey(day);
                  const on = isChecked(checks, habit.id, key);
                  const future = isFutureDay(day, today);
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={future}
                      onClick={() => {
                        onSelect(key);
                        if (!future) onToggle(habit.id, key);
                      }}
                      aria-label={`${habit.name} ${key}`}
                      className={cn(
                        "mx-auto flex size-10 items-center justify-center rounded-md border transition-colors duration-150",
                        on
                          ? cn(color.bg, "border-transparent text-accent-fg")
                          : "border-border bg-bg",
                        future && "opacity-30",
                      )}
                    >
                      <Check className={cn("size-4", on ? "opacity-100" : "opacity-0")} />
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
