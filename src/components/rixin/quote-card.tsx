import { Bookmark, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL } from "@/lib/rixin/quotes";
import type { Quote } from "@/lib/rixin/types";
import { cn } from "@/lib/utils";

export function QuoteCard({
  quote,
  favorited,
  known,
  onFavorite,
  onKnown,
  onAnother,
  compact = false,
}: {
  quote: Quote;
  favorited: boolean;
  known: boolean;
  onFavorite: () => void;
  onKnown: () => void;
  onAnother?: () => void;
  compact?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-line bg-paper-1 p-5 shadow-lift">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-paper-2 px-2.5 py-1 text-xs text-ink-soft">
          {CATEGORY_LABEL[quote.category]}
        </span>
        <div className="flex items-center">
          {onAnother ? (
            <Button variant="ghost" size="iconSm" onClick={onAnother} aria-label="再来一条">
              <RefreshCw className="size-4" />
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onFavorite}
            aria-label={favorited ? "取消收藏" : "收藏"}
          >
            <Bookmark className={cn("size-4", favorited && "fill-accent text-accent")} />
          </Button>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onKnown}
            aria-label={known ? "标为未识" : "标为已识"}
          >
            <Check className={cn("size-4", known && "text-accent")} />
          </Button>
        </div>
      </div>
      <h2 className={cn("font-display text-ink", compact ? "text-2xl" : "text-3xl")}>{quote.text}</h2>
      <p className="mt-2 text-sm tracking-wide text-ink-faint">{quote.pinyin}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{quote.meaning}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{quote.usage}</p>
      <p className="mt-4 text-xs text-ink-faint">{quote.source}</p>
    </article>
  );
}
