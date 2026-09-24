import { createFileRoute } from "@tanstack/react-router";
import { WordsView } from "@/components/words-view";

export const Route = createFileRoute("/words")({ component: WordsPage });

function WordsPage() {
  return <WordsView />;
}
