import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/rixin/app-shell";
import { QuoteCard } from "@/components/rixin/quote-card";
import { Input } from "@/components/ui/input";
import { hashToIndex, todayKey } from "@/lib/rixin/dates";
import {
  CATEGORY_LABEL,
  QUOTES,
  searchQuotes,
} from "@/lib/rixin/quotes";
import { useRixinStore } from "@/lib/rixin/store";
import type { QuoteCategory } from "@/lib/rixin/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quotes")({ component: QuotesPage });

const FILTERS: Array<"all" | QuoteCategory | "fav" | "known"> = [
  "all",
  "idiom",
  "verse",
  "aphorism",
  "elegant",
  "fav",
  "known",
];

function label(f: (typeof FILTERS)[number]) {
  if (f === "all") return "全部";
  if (f === "fav") return "收藏";
  if (f === "known") return "已识";
  return CATEGORY_LABEL[f];
}

function QuotesPage() {
  const quotesMeta = useRixinStore((s) => s.quotes);
  const toggleFavorite = useRixinStore((s) => s.toggleFavorite);
  const toggleKnown = useRixinStore((s) => s.toggleKnown);
  const setExtraQuote = useRixinStore((s) => s.setExtraQuote);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [q, setQ] = useState("");
  const [browseId, setBrowseId] = useState<string | null>(null);

  const daily = QUOTES[hashToIndex(todayKey(), QUOTES.length)] ?? QUOTES[0]!;

  const pool = useMemo(() => {
    let list = QUOTES;
    if (filter === "fav") list = QUOTES.filter((x) => quotesMeta.favorites.includes(x.id));
    else if (filter === "known") list = QUOTES.filter((x) => quotesMeta.known.includes(x.id));
    else if (filter !== "all") list = QUOTES.filter((x) => x.category === filter);
    return searchQuotes(q, list);
  }, [filter, q, quotesMeta.favorites, quotesMeta.known]);

  const current =
    pool.find((x) => x.id === browseId) ?? pool[0] ?? daily;

  const another = () => {
    if (pool.length < 2) return;
    const rest = pool.filter((x) => x.id !== current.id);
    const next = rest[Math.floor(Math.random() * rest.length)];
    if (next) {
      setBrowseId(next.id);
      setExtraQuote(next.id);
    }
  };

  return (
    <AppShell active="/quotes">
      <header className="mb-6">
        <h1 className="font-display text-3xl">词句</h1>
        <p className="mt-1 text-sm text-ink-faint">成语、诗句、名言与雅词，带拼音和用法。</p>
      </header>

      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="检索字词、拼音或出处"
        className="mb-4"
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setBrowseId(null);
            }}
            className={cn(
              "h-9 rounded-full px-3 text-sm",
              filter === f ? "bg-accent text-accent-fg" : "bg-paper-2 text-ink-soft",
            )}
          >
            {label(f)}
          </button>
        ))}
      </div>

      {pool.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-sm text-ink-faint">
          没有符合条件的词句。
        </p>
      ) : (
        <QuoteCard
          quote={current}
          favorited={quotesMeta.favorites.includes(current.id)}
          known={quotesMeta.known.includes(current.id)}
          onFavorite={() => toggleFavorite(current.id)}
          onKnown={() => toggleKnown(current.id)}
          onAnother={pool.length > 1 ? another : undefined}
        />
      )}
    </AppShell>
  );
}
