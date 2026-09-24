import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HabitForm } from "@/components/habit-form";
import { HabitRow } from "@/components/habit-row";
import { WordCard, WordDetail } from "@/components/word-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatLong, todayKey } from "@/lib/dates";
import { dailyEntry } from "@/lib/lexicon";
import { dayCompletion, perfectDayStreak } from "@/lib/stats";
import { useStore } from "@/lib/store";
import type { Habit, LexiconEntry } from "@/lib/types";

export function TodayView() {
  const habits = useStore((s) => s.habits);
  const checks = useStore((s) => s.checks);
  const addHabit = useStore((s) => s.addHabit);
  const updateHabit = useStore((s) => s.updateHabit);
  const deleteHabit = useStore((s) => s.deleteHabit);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Habit | null>(null);
  const [deleting, setDeleting] = useState<Habit | null>(null);
  const [openWord, setOpenWord] = useState<LexiconEntry | null>(null);

  const date = useMemo(() => new Date(), []);
  const key = todayKey();
  const entry = useMemo(() => dailyEntry(date), [date]);
  const { done, total } = dayCompletion(habits, checks, key);
  const perfect = perfectDayStreak(habits, checks);
  const allDone = total > 0 && done === total;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <p className="text-sm text-muted">{formatLong(date)}</p>
        <h1 className="font-serif text-3xl font-medium tracking-tight">今日</h1>
      </header>

      <WordCard entry={entry} featured onOpen={setOpenWord} />

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-medium">日课</h2>
            <p className="text-sm text-muted">
              {total === 0
                ? "立一条能每天完成的小事"
                : allDone
                  ? "今日功课已毕"
                  : `${done} / ${total} 已完成`}
              {perfect > 0 ? ` · 全勤 ${perfect} 天` : ""}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus />
            添加
          </Button>
        </div>

        {habits.length === 0 ? (
          <div className="rounded-xl bg-bg-elevated px-5 py-10 text-center shadow-card">
            <p className="font-serif text-lg">从一条日课开始</p>
            <p className="mt-2 text-sm text-muted">名字短一点，容易每天点亮。</p>
            <Button
              className="mt-5"
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              <Plus />
              添加习惯
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {habits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                dateKey={key}
                onEdit={(h) => {
                  setEditing(h);
                  setFormOpen(true);
                }}
                onDelete={setDeleting}
              />
            ))}
          </div>
        )}
      </section>

      <HabitForm
        open={formOpen}
        onOpenChange={setFormOpen}
        habit={editing}
        onSubmit={(value) => {
          if (editing) updateHabit(editing.id, value);
          else addHabit(value);
        }}
      />

      <AlertDialog open={Boolean(deleting)} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>删除「{deleting?.name}」？</AlertDialogTitle>
          <AlertDialogDescription>
            这条习惯和它的打卡记录会一并从本机清除，无法恢复。
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleting) deleteHabit(deleting.id);
                setDeleting(null);
              }}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={Boolean(openWord)} onOpenChange={(o) => !o && setOpenWord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>词句</DialogTitle>
          </DialogHeader>
          {openWord ? (
            <WordDetail entry={openWord} onClose={() => setOpenWord(null)} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
