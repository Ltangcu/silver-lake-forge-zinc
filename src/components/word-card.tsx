import { Bookmark, BookmarkCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KIND_LABEL, type LexiconEntry } from "@/lib/types";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Props = {
  entry: LexiconEntry;
  featured?: boolean;
  onOpen?: (entry: LexiconEntry) => void;
};

export function WordCard({ entry, featured = false, onOpen }: Props) {
  const saved = useStore((s) => s.savedWordIds.includes(entry.id));
  const learned = useStore((s) => s.learnedWordIds.includes(entry.id));
  const toggleSaved = useStore((s) => s.toggleSaved);
  const toggleLearned = useStore((s) => s.toggleLearned);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl bg-bg-elevated p-5 shadow-card",
        featured && "p-6",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-medium tracking-wide text-muted">
          {featured ? "今日词句" : KIND_LABEL[entry.kind]}
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={learned ? "标为未识" : "标为已识"}
            onClick={() => toggleLearned(entry.id)}
          >
            <Check className={cn("size-4", learned ? "text-accent" : "text-subtle")} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={saved ? "取消收藏" : "收藏"}
            onClick={() => toggleSaved(entry.id)}
          >
            {saved ? (
              <BookmarkCheck className="size-4 text-accent" />
            ) : (
              <Bookmark className="size-4 text-subtle" />
            )}
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen?.(entry)}
        className="w-full text-left"
      >
        <h2
          className={cn(
            "font-serif font-medium tracking-tight text-fg",
            featured ? "text-2xl leading-snug md:text-3xl" : "text-xl leading-snug",
          )}
        >
          {entry.text}
        </h2>
        {entry.subtext ? (
          <p className="mt-1 font-serif text-lg text-fg/80 md:text-xl">{entry.subtext}</p>
        ) : null}
        <p className="mt-2 text-sm text-subtle">{entry.pinyin}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{entry.meaning}</p>
        <p className="mt-3 text-xs text-subtle">{entry.source}</p>
      </button>
    </article>
  );
}

export function WordDetail({
  entry,
  onClose,
}: {
  entry: LexiconEntry;
  onClose: () => void;
}) {
  const saved = useStore((s) => s.savedWordIds.includes(entry.id));
  const learned = useStore((s) => s.learnedWordIds.includes(entry.id));
  const toggleSaved = useStore((s) => s.toggleSaved);
  const toggleLearned = useStore((s) => s.toggleLearned);

  return (
    <div className="space-y-4">
      <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-medium text-muted">
        {KIND_LABEL[entry.kind]}
      </span>
      <div>
        <h3 className="font-serif text-2xl font-medium leading-snug">{entry.text}</h3>
        {entry.subtext ? (
          <p className="mt-1 font-serif text-xl text-fg/80">{entry.subtext}</p>
        ) : null}
        <p className="mt-2 text-sm text-subtle">{entry.pinyin}</p>
      </div>
      <section className="space-y-1">
        <h4 className="text-xs font-medium tracking-wide text-muted">释义</h4>
        <p className="text-sm leading-relaxed">{entry.meaning}</p>
      </section>
      <section className="space-y-1">
        <h4 className="text-xs font-medium tracking-wide text-muted">用法</h4>
        <p className="text-sm leading-relaxed">{entry.usage}</p>
      </section>
      <p className="text-xs text-subtle">{entry.source}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        <Button variant={saved ? "subtle" : "outline"} onClick={() => toggleSaved(entry.id)}>
          {saved ? "已收藏" : "收藏"}
        </Button>
        <Button variant={learned ? "subtle" : "outline"} onClick={() => toggleLearned(entry.id)}>
          {learned ? "已识" : "标为已识"}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          关闭
        </Button>
      </div>
    </div>
  );
}
