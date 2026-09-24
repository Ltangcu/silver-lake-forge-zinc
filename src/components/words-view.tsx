import { useMemo, useState } from "react";
import { Search, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WordCard, WordDetail } from "@/components/word-card";
import { dailyEntry, LEXICON, searchLexicon } from "@/lib/lexicon";
import { useStore } from "@/lib/store";
import { KIND_LABEL, type LexiconEntry, type LexiconKind } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | "saved" | "new" | LexiconKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "verse", label: KIND_LABEL.verse },
  { id: "word", label: KIND_LABEL.word },
  { id: "idiom", label: KIND_LABEL.idiom },
  { id: "quote", label: KIND_LABEL.quote },
  { id: "saved", label: "收藏" },
  { id: "new", label: "未识" },
];

export function WordsView() {
  const saved = useStore((s) => s.savedWordIds);
  const learned = useStore((s) => s.learnedWordIds);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<LexiconEntry | null>(null);
  const [shuffleId, setShuffleId] = useState<string | null>(null);

  const today = useMemo(() => dailyEntry(), []);
  const extra = shuffleId ? LEXICON.find((e) => e.id === shuffleId) : null;

  const list = useMemo(() => {
    const kind =
      filter === "all" || filter === "saved" || filter === "new" ? "all" : filter;
    let rows = searchLexicon(query, kind);
    if (filter === "saved") rows = rows.filter((e) => saved.includes(e.id));
    if (filter === "new") rows = rows.filter((e) => !learned.includes(e.id));
    return rows;
  }, [query, filter, saved, learned]);

  function shuffle() {
    const pool = LEXICON.filter((e) => e.id !== today.id);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) {
      setShuffleId(pick.id);
      setOpen(pick);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-medium tracking-tight">词句</h1>
          <p className="mt-1 text-sm text-muted">
            名言、雅词、成语与诗句。读一条，用一条。
          </p>
        </div>
        <Button variant="outline" onClick={shuffle}>
          <Shuffle />
          再来一条
        </Button>
      </header>

      <WordCard entry={extra ?? today} featured={!extra} onOpen={setOpen} />

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="检索字词、拼音或出处"
          className="pl-10"
          aria-label="检索词句"
        />
      </div>

      <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-9 shrink-0 rounded-md px-3 text-sm transition-colors duration-150",
              filter === f.id ? "bg-accent text-accent-fg" : "bg-surface text-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">
          {filter === "saved" ? "还没有收藏。读到喜欢的，点书签即可。" : "没有匹配的词句。"}
        </p>
      ) : (
        <ul className="space-y-3">
          {list.map((entry) => (
            <li key={entry.id}>
              <WordCard entry={entry} onOpen={setOpen} />
            </li>
          ))}
        </ul>
      )}

      <Dialog open={Boolean(open)} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>词句</DialogTitle>
          </DialogHeader>
          {open ? <WordDetail entry={open} onClose={() => setOpen(null)} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
