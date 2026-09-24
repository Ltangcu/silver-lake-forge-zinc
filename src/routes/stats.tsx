import { createFileRoute } from "@tanstack/react-router";
import { StatsPanel } from "@/components/stats-panel";

export const Route = createFileRoute("/stats")({ component: StatsPage });

function StatsPage() {
  return <StatsPanel />;
}
