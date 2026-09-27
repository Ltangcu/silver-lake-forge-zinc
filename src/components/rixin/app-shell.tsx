import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, CircleDot, LayoutList } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "今日", icon: CircleDot },
  { to: "/calendar", label: "日历", icon: CalendarDays },
  { to: "/quotes", label: "词句", icon: BookOpen },
  { to: "/stats", label: "统计", icon: LayoutList },
] as const;

export function AppShell({
  children,
  active,
}: {
  children: ReactNode;
  active: (typeof NAV)[number]["to"];
}) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl">
        <aside className="sticky top-0 hidden h-dvh w-48 shrink-0 flex-col border-r border-line px-4 py-8 md:flex">
          <p className="font-display text-2xl tracking-widest">日新</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-faint">
            习惯 · 词句
          </p>
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-lg px-3 text-sm",
                  active === item.to
                    ? "bg-paper-2 text-ink"
                    : "text-ink-soft hover:bg-paper-2/70",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto font-display text-sm leading-7 text-ink-faint">
            苟日新
            <br />
            日日新
            <br />
            又日新
          </p>
        </aside>
        <main className="min-w-0 flex-1 px-4 pt-6 pb-24 md:px-8 md:pt-10 md:pb-10">
          {children}
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper-1/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 px-2 py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                active === item.to ? "text-ink" : "text-ink-faint",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
