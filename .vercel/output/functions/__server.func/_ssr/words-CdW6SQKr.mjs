import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Search, i as Shuffle } from "../_libs/lucide-react.mjs";
import { n as useStore, y as cn } from "./router-BUXqW4l2.mjs";
import { t as Button } from "./button-Bd8MhFZt.mjs";
import { r as KIND_LABEL } from "./types-BDzVSBvY.mjs";
import { a as DialogTitle, c as WordCard, d as searchLexicon, i as DialogHeader, l as WordDetail, n as DialogContent, o as Input, s as LEXICON, t as Dialog, u as dailyEntry } from "./lexicon-DSVZhJBJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/words-CdW6SQKr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "全部"
	},
	{
		id: "verse",
		label: KIND_LABEL.verse
	},
	{
		id: "word",
		label: KIND_LABEL.word
	},
	{
		id: "idiom",
		label: KIND_LABEL.idiom
	},
	{
		id: "quote",
		label: KIND_LABEL.quote
	},
	{
		id: "saved",
		label: "收藏"
	},
	{
		id: "new",
		label: "未识"
	}
];
function WordsView() {
	const saved = useStore((s) => s.savedWordIds);
	const learned = useStore((s) => s.learnedWordIds);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(null);
	const [shuffleId, setShuffleId] = (0, import_react.useState)(null);
	const today = (0, import_react.useMemo)(() => dailyEntry(), []);
	const extra = shuffleId ? LEXICON.find((e) => e.id === shuffleId) : null;
	const list = (0, import_react.useMemo)(() => {
		let rows = searchLexicon(query, filter === "all" || filter === "saved" || filter === "new" ? "all" : filter);
		if (filter === "saved") rows = rows.filter((e) => saved.includes(e.id));
		if (filter === "new") rows = rows.filter((e) => !learned.includes(e.id));
		return rows;
	}, [
		query,
		filter,
		saved,
		learned
	]);
	function shuffle() {
		const pool = LEXICON.filter((e) => e.id !== today.id);
		const pick = pool[Math.floor(Math.random() * pool.length)];
		if (pick) {
			setShuffleId(pick.id);
			setOpen(pick);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl font-medium tracking-tight",
					children: "词句"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "名言、雅词、成语与诗句。读一条，用一条。"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: shuffle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, {}), "再来一条"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				entry: extra ?? today,
				featured: !extra,
				onOpen: setOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "检索字词、拼音或出处",
					className: "pl-10",
					"aria-label": "检索词句"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 flex gap-1 overflow-x-auto px-1 pb-1",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f.id),
					className: cn("h-9 shrink-0 rounded-md px-3 text-sm transition-colors duration-150", filter === f.id ? "bg-accent text-accent-fg" : "bg-surface text-muted"),
					children: f.label
				}, f.id))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted",
				children: filter === "saved" ? "还没有收藏。读到喜欢的，点书签即可。" : "没有匹配的词句。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: list.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
					entry,
					onOpen: setOpen
				}) }, entry.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(open),
				onOpenChange: (o) => !o && setOpen(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[85dvh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "词句" }) }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordDetail, {
						entry: open,
						onClose: () => setOpen(null)
					}) : null]
				})
			})
		]
	});
}
function WordsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordsView, {});
}
//#endregion
export { WordsPage as component };
