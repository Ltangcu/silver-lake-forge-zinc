import { Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentStreak, isChecked } from "@/lib/stats";
import { useStore } from "@/lib/store";
import { HABIT_COLOR_CLASS, type Habit } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  habit: Habit;
  dateKey: string;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

export function HabitRow({ habit, dateKey, onEdit, onDelete }: Props) {
  const checks = useStore((s) => s.checks);
  const toggleCheck = useStore((s) => s.toggleCheck);
  const on = isChecked(checks, habit.id, dateKey);
  const streak = currentStreak(habit, checks);
  const color = HABIT_COLOR_CLASS[habit.color];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg bg-bg-elevated p-3 shadow-card transition-[box-shadow] duration-150",
        on && "shadow-card-hover",
      )}
    >
      <button
        type="button"
        onClick={() => toggleCheck(habit.id, dateKey)}
        aria-pressed={on}
        aria-label={on ? `取消完成 ${habit.name}` : `完成 ${habit.name}`}
        className={cn(
          "relative flex size-12 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color,transform] duration-150",
          on
            ? cn(color.bg, "border-transparent text-accent-fg")
            : "border-border-strong bg-bg text-transparent hover:border-fg/30",
        )}
      >
        <Check
          className={cn(
            "size-5 transition-[opacity,transform,filter] duration-200",
            on ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
          )}
          strokeWidth={2.4}
        />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="truncate font-medium">{habit.name}</p>
          <span className={cn("text-xs tabular", color.text)}>
            {streak > 0 ? `连续 ${streak} 天` : "待开始"}
          </span>
        </div>
        {habit.note ? (
          <p className="truncate text-sm text-muted">{habit.note}</p>
        ) : null}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`${habit.name} 更多`}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onEdit(habit)}>
            <Pencil className="size-4" />
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem variant="danger" onSelect={() => onDelete(habit)}>
            <Trash2 className="size-4" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
