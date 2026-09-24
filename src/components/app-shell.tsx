import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, CheckCircle2, LineChart } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "今日", icon: CheckCircle2 },
  { to: "/calendar", label: "日历", icon: CalendarDays },
  { to: "/words", label: "词句", icon: BookOpen },
  { to: "/stats", label: "统计", icon: LineChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void useStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-border bg-bg-elevated/80 px-4 py-6 md:flex">
        <Brand />
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(pathname, item.to)} />
          ))}
        </nav>
        <p className="mt-auto px-2 font-serif text-sm leading-relaxed text-muted">
          苟日新
          <br />
          日日新
          <br />
          又日新
        </p>
      </aside>

      <div className="md:pl-56">
        <header className="flex items-center justify-between px-5 pt-5 pb-2 md:hidden">
          <Brand compact />
        </header>
        <main className="mx-auto w-full max-w-3xl px-5 pt-2 pb-28 md:px-8 md:pt-10 md:pb-16">
          {children}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 px-2 pt-1 md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <ul className="grid grid-cols-4">
          {NAV.map((item) => {
            const active = isActive(pathname, item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-xs",
                    active ? "text-accent" : "text-muted",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-baseline gap-2 px-2">
      <span className="font-serif text-2xl font-medium tracking-tight">日新</span>
      {!compact && <span className="text-xs text-muted">习惯 · 词句</span>}
    </Link>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof CheckCircle2;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
        active ? "bg-surface text-fg" : "text-muted hover:bg-surface/70 hover:text-fg",
      )}
    >
      <Icon className="size-4" strokeWidth={active ? 2.2 : 1.8} />
      {label}
    </Link>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
