import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HABIT_COLOR_CLASS, HABIT_COLORS, type Habit, type HabitColor } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit | null;
  onSubmit: (value: { name: string; note: string; color: HabitColor }) => void;
};

export function HabitForm({ open, onOpenChange, habit, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState<HabitColor>("pine");

  useEffect(() => {
    if (open) {
      setName(habit?.name ?? "");
      setNote(habit?.note ?? "");
      setColor(habit?.color ?? "pine");
    }
  }, [open, habit]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit({ name: trimmed, note, color });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{habit ? "编辑习惯" : "新的日课"}</DialogTitle>
          <DialogDescription>
            {habit ? "改名字、备注或颜色标记。" : "立一条能每天完成的小事。"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="habit-name">名称</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：晨读"
              maxLength={20}
              autoFocus
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="habit-note">备注</Label>
            <Textarea
              id="habit-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="给自己一句提醒，可选"
              maxLength={80}
            />
          </div>
          <div className="space-y-2">
            <Label>颜色</Label>
            <div className="flex flex-wrap gap-2">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-md ring-2 ring-transparent transition-[box-shadow,transform] duration-150",
                    HABIT_COLOR_CLASS[c.id].bg,
                    color === c.id && "ring-fg ring-offset-2 ring-offset-bg-elevated",
                  )}
                  aria-label={c.label}
                  aria-pressed={color === c.id}
                >
                  <span className="text-xs text-accent-fg">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{habit ? "保存" : "添加"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
