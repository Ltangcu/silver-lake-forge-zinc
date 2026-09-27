import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HABIT_COLORS, type Habit, type HabitColor } from "@/lib/rixin/types";
import { cn } from "@/lib/utils";

const COLOR_CLASS: Record<HabitColor, string> = {
  pine: "bg-habit-pine",
  clay: "bg-habit-clay",
  tea: "bg-habit-tea",
  ink: "bg-habit-ink",
  mist: "bg-habit-mist",
  brick: "bg-habit-brick",
};

export function HabitFormDialog({
  open,
  onOpenChange,
  habit,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  habit?: Habit | null;
  onSubmit: (v: { name: string; note: string; color: HabitColor }) => void;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(habit?.name ?? "");
  const [note, setNote] = useState(habit?.note ?? "");
  const [color, setColor] = useState<HabitColor>(habit?.color ?? "pine");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setName(habit?.name ?? "");
          setNote(habit?.note ?? "");
          setColor(habit?.color ?? "pine");
        }
        onOpenChange(v);
      }}
    >
      <DialogContent title={habit ? "编辑习惯" : "添加习惯"}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, note, color });
            onOpenChange(false);
          }}
        >
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-ink-soft">名称</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={12} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-ink-soft">一句说明</span>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={40}
              rows={2}
            />
          </label>
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm text-ink-soft">颜色</legend>
            <div className="flex gap-2">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2 ring-offset-paper-1",
                    COLOR_CLASS[c],
                    color === c ? "ring-2 ring-ink" : "ring-0",
                  )}
                />
              ))}
            </div>
          </fieldset>
          <div className="mt-1 flex items-center justify-between gap-3">
            {habit && onDelete ? (
              <Button
                type="button"
                variant="quiet"
                onClick={() => {
                  onDelete();
                  onOpenChange(false);
                }}
              >
                删除
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit">{habit ? "保存" : "添加"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function HabitDot({ color, className }: { color: HabitColor; className?: string }) {
  return <span className={cn("inline-block size-2.5 rounded-full", COLOR_CLASS[color], className)} />;
}
