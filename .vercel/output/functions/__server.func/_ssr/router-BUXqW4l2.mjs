import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as BookOpen, l as CircleCheck, m as CalendarDays, n as TriangleAlert, p as ChartLine } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as isAfter, c as startOfMonth, g as addDays, i as isBefore, l as eachDayOfInterval, m as startOfWeek, n as parseISO, o as format, p as startOfDay, s as endOfWeek, t as zhCN, u as endOfMonth } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BUXqW4l2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}
function toKey(date) {
	return format(date, "yyyy-MM-dd");
}
function todayKey() {
	return toKey(/* @__PURE__ */ new Date());
}
function formatLong(date) {
	return format(date, "M月d日 EEEE", { locale: zhCN });
}
function formatMonth(date) {
	return format(date, "yyyy年M月", { locale: zhCN });
}
function formatWeekRange(anchor) {
	const start = startOfWeek(anchor, { weekStartsOn: 1 });
	const end = endOfWeek(anchor, { weekStartsOn: 1 });
	return `${format(start, "M月d日", { locale: zhCN })} – ${format(end, "M月d日", { locale: zhCN })}`;
}
function weekdayLabels() {
	return [
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"日"
	];
}
function monthGrid(anchor) {
	const start = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
	const end = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
	return eachDayOfInterval({
		start,
		end
	});
}
function weekDays(anchor) {
	const start = startOfWeek(anchor, { weekStartsOn: 1 });
	return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
function isFutureDay(date, today = startOfDay(/* @__PURE__ */ new Date())) {
	return isAfter(startOfDay(date), today);
}
function lastNDays(n, until = startOfDay(/* @__PURE__ */ new Date())) {
	return Array.from({ length: n }, (_, i) => addDays(until, -(n - 1 - i)));
}
function checkKey(habitId, dateKey) {
	return `${habitId}:${dateKey}`;
}
function isChecked(checks, habitId, dateKey) {
	return Boolean(checks[checkKey(habitId, dateKey)]);
}
function habitStart(habit, today) {
	const created = startOfDay(parseISO(habit.createdAt));
	return isBefore(today, created) ? today : created;
}
function currentStreak(habit, checks, today = startOfDay(/* @__PURE__ */ new Date())) {
	const todayStr = toKey(today);
	let cursor = isChecked(checks, habit.id, todayStr) ? today : addDays(today, -1);
	const start = habitStart(habit, today);
	let n = 0;
	while (!isBefore(cursor, start)) {
		if (!isChecked(checks, habit.id, toKey(cursor))) break;
		n += 1;
		cursor = addDays(cursor, -1);
		if (n > 4e3) break;
	}
	return n;
}
function longestStreak(habit, checks, today = startOfDay(/* @__PURE__ */ new Date())) {
	let cursor = habitStart(habit, today);
	let run = 0;
	let best = 0;
	while (!isBefore(today, cursor)) {
		if (isChecked(checks, habit.id, toKey(cursor))) {
			run += 1;
			if (run > best) best = run;
		} else run = 0;
		cursor = addDays(cursor, 1);
		if (best > 4e3) break;
	}
	return best;
}
function completionInRange(habit, checks, days) {
	const start = habitStart(habit, startOfDay(/* @__PURE__ */ new Date()));
	const eligible = days.filter((d) => !isBefore(d, start));
	if (eligible.length === 0) return {
		done: 0,
		total: 0,
		rate: 0
	};
	const done = eligible.filter((d) => isChecked(checks, habit.id, toKey(d))).length;
	return {
		done,
		total: eligible.length,
		rate: done / eligible.length
	};
}
function dayCompletion(habits, checks, dateKey) {
	if (habits.length === 0) return {
		done: 0,
		total: 0,
		rate: 0
	};
	const done = habits.filter((h) => isChecked(checks, h.id, dateKey)).length;
	return {
		done,
		total: habits.length,
		rate: done / habits.length
	};
}
function perfectDayStreak(habits, checks, today = startOfDay(/* @__PURE__ */ new Date())) {
	if (habits.length === 0) return 0;
	let cursor = dayCompletion(habits, checks, toKey(today)).rate === 1 ? today : addDays(today, -1);
	let n = 0;
	while (n < 4e3) {
		const { rate, total } = dayCompletion(habits, checks, toKey(cursor));
		if (total === 0 || rate < 1) break;
		n += 1;
		cursor = addDays(cursor, -1);
	}
	return n;
}
var nowIso = () => (/* @__PURE__ */ new Date()).toISOString();
var DEFAULT_HABITS = [
	{
		id: "seed-read",
		name: "晨读",
		note: "读一页书，或把今日词句读出声",
		color: "pine",
		createdAt: "2026-09-20T00:00:00.000Z"
	},
	{
		id: "seed-rise",
		name: "早起",
		note: "按自己的节奏起身，不比谁更早",
		color: "clay",
		createdAt: "2026-09-20T00:00:00.000Z"
	},
	{
		id: "seed-move",
		name: "走动",
		note: "散步、拉伸，出门也算",
		color: "sea",
		createdAt: "2026-09-20T00:00:00.000Z"
	},
	{
		id: "seed-write",
		name: "落笔",
		note: "写下三句，不求长，求真",
		color: "ink",
		createdAt: "2026-09-20T00:00:00.000Z"
	}
];
var useStore = create()(persist((set, get) => ({
	habits: DEFAULT_HABITS,
	checks: {},
	savedWordIds: [],
	learnedWordIds: [],
	addHabit: ({ name, note, color }) => {
		const habit = {
			id: uid(),
			name: name.trim(),
			note: note.trim(),
			color,
			createdAt: nowIso()
		};
		set({ habits: [...get().habits, habit] });
	},
	updateHabit: (id, { name, note, color }) => {
		set({ habits: get().habits.map((h) => h.id === id ? {
			...h,
			name: name.trim(),
			note: note.trim(),
			color
		} : h) });
	},
	deleteHabit: (id) => {
		const checks = { ...get().checks };
		for (const key of Object.keys(checks)) if (key.startsWith(`${id}:`)) delete checks[key];
		set({
			habits: get().habits.filter((h) => h.id !== id),
			checks
		});
	},
	toggleCheck: (habitId, dateKey) => {
		const key = checkKey(habitId, dateKey);
		const checks = { ...get().checks };
		if (checks[key]) delete checks[key];
		else checks[key] = true;
		set({ checks });
	},
	toggleSaved: (id) => {
		const cur = get().savedWordIds;
		set({ savedWordIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
	},
	toggleLearned: (id) => {
		const cur = get().learnedWordIds;
		set({ learnedWordIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
	}
}), {
	name: "rixin-v1",
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({
		habits: s.habits,
		checks: s.checks,
		savedWordIds: s.savedWordIds,
		learnedWordIds: s.learnedWordIds
	}),
	skipHydration: true
}));
var NAV = [
	{
		to: "/",
		label: "今日",
		icon: CircleCheck
	},
	{
		to: "/calendar",
		label: "日历",
		icon: CalendarDays
	},
	{
		to: "/words",
		label: "词句",
		icon: BookOpen
	},
	{
		to: "/stats",
		label: "统计",
		icon: ChartLine
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		useStore.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-border bg-bg-elevated/80 px-4 py-6 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-col gap-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
							...item,
							active: isActive(pathname, item.to)
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto px-2 font-serif text-sm leading-relaxed text-muted",
						children: [
							"苟日新",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"日日新",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"又日新"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "flex items-center justify-between px-5 pt-5 pb-2 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-3xl px-5 pt-2 pb-28 md:px-8 md:pt-10 md:pb-16",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 px-2 pt-1 md:hidden",
				style: { paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const active = isActive(pathname, item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-xs", active ? "text-accent" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.8
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-baseline gap-2 px-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-2xl font-medium tracking-tight",
			children: "日新"
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: "习惯 · 词句"
		})]
	});
}
function NavItem({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-surface text-fg" : "text-muted hover:bg-surface/70 hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			strokeWidth: active ? 2.2 : 1.8
		}), label]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
var styles_default = "/assets/styles-CB4JXxvF.css";
var APP_NAME = "日新";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "日新：每日习惯打卡、连续日历，以及诗句、成语、雅词与名言。"
			},
			{
				name: "theme-color",
				content: "#3d5a4c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-CN",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-R1MNId4o.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./calendar-DKgRT7AB.mjs");
var Route$2 = createFileRoute("/calendar")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stats-BxKtkgfy.mjs");
var Route$1 = createFileRoute("/stats")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./words-CdW6SQKr.mjs");
var Route = createFileRoute("/words")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	CalendarRoute: Route$2.update({
		id: "/calendar",
		path: "/calendar",
		getParentRoute: () => Route$4
	}),
	StatsRoute: Route$1.update({
		id: "/stats",
		path: "/stats",
		getParentRoute: () => Route$4
	}),
	WordsRoute: Route.update({
		id: "/words",
		path: "/words",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { weekDays as _, dayCompletion as a, perfectDayStreak as c, formatWeekRange as d, isFutureDay as f, todayKey as g, toKey as h, currentStreak as i, formatLong as l, monthGrid as m, useStore as n, isChecked as o, lastNDays as p, completionInRange as r, longestStreak as s, router_exports as t, formatMonth as u, weekdayLabels as v, cn as y };
