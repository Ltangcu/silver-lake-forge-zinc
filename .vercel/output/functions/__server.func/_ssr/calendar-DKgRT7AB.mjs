import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as ChevronLeft, f as Check, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { d as isSameDay, f as addWeeks, h as addMonths, o as format, r as isSameMonth } from "../_libs/date-fns.mjs";
import { _ as weekDays, a as dayCompletion, d as formatWeekRange, f as isFutureDay, h as toKey, m as monthGrid, n as useStore, o as isChecked, u as formatMonth, v as weekdayLabels, y as cn } from "./router-BUXqW4l2.mjs";
import { t as Button } from "./button-Bd8MhFZt.mjs";
import { n as HABIT_COLOR_CLASS } from "./types-BDzVSBvY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-DKgRT7AB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarBoard() {
	const habits = useStore((s) => s.habits);
	const checks = useStore((s) => s.checks);
	const toggleCheck = useStore((s) => s.toggleCheck);
	const [mode, setMode] = (0, import_react.useState)("month");
	const [anchor, setAnchor] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [selected, setSelected] = (0, import_react.useState)(() => toKey(/* @__PURE__ */ new Date()));
	const today = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	function shift(dir) {
		setAnchor((d) => mode === "week" ? addWeeks(d, dir) : addMonths(d, dir));
	}
	const selectedDate = /* @__PURE__ */ new Date(`${selected}T12:00:00`);
	const selectedLocked = isFutureDay(selectedDate, today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl font-medium tracking-tight",
					children: "日历"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: mode === "week" ? formatWeekRange(anchor) : formatMonth(anchor)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						value: mode,
						onChange: (v) => {
							setMode(v);
							setAnchor(/* @__PURE__ */ new Date());
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: () => shift(-1),
								"aria-label": "上一页",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									const now = /* @__PURE__ */ new Date();
									setAnchor(now);
									setSelected(toKey(now));
								},
								children: "今天"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: () => shift(1),
								"aria-label": "下一页",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							})
						]
					})]
				})]
			}),
			mode === "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGrid, {
				anchor,
				today,
				selected,
				habits,
				checks,
				onSelect: setSelected
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekGrid, {
				anchor,
				today,
				selected,
				habits,
				checks,
				onSelect: setSelected,
				onToggle: toggleCheck
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-bg-elevated p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: isSameDay(selectedDate, today) ? "这一天" : format(selectedDate, "M月d日")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: selectedLocked ? "尚未到来" : habits.length === 0 ? "还没有习惯" : `${dayCompletion(habits, checks, selected).done} / ${habits.length} 完成`
					})]
				}), habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "先立一条日课，格子才会亮起来。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: habits.map((habit) => {
						const on = isChecked(checks, habit.id, selected);
						const color = HABIT_COLOR_CLASS[habit.color];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: selectedLocked,
							onClick: () => toggleCheck(habit.id, selected),
							className: cn("flex h-12 w-full items-center gap-3 rounded-md px-2 text-left transition-colors duration-150", selectedLocked ? "opacity-40" : "hover:bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-8 items-center justify-center rounded-sm border", on ? cn(color.bg, "border-transparent text-accent-fg") : "border-border bg-bg"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", on ? "opacity-100" : "opacity-0") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: habit.name
							})]
						}) }, habit.id);
					})
				})]
			})
		]
	});
}
function Segmented({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-md bg-surface p-1",
		children: ["week", "month"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(m),
			className: cn("h-8 rounded-sm px-3 text-sm transition-colors duration-150", value === m ? "bg-bg-elevated text-fg shadow-card" : "text-muted"),
			children: m === "week" ? "周" : "月"
		}, m))
	});
}
function MonthGrid({ anchor, today, selected, habits, checks, onSelect }) {
	const days = monthGrid(anchor);
	const labels = weekdayLabels();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg-elevated p-3 shadow-card md:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 grid grid-cols-7",
			children: labels.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-1 text-center text-xs text-muted",
				children: d
			}, d))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1",
			children: days.map((day) => {
				const key = toKey(day);
				const inMonth = isSameMonth(day, anchor);
				const { rate, done } = dayCompletion(habits, checks, key);
				const future = isFutureDay(day, today);
				const isToday = isSameDay(day, today);
				const isSel = key === selected;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(key),
					className: cn("flex min-h-12 flex-col items-center justify-center rounded-md py-1 transition-colors duration-150", !inMonth && "opacity-30", isSel && "bg-surface", isToday && !isSel && "ring-1 ring-border-strong", future && "cursor-default"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-sm tabular", isToday && "font-medium text-accent"),
							children: format(day, "d")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex h-2 items-center gap-0.5",
							children: habits.filter((h) => isChecked(checks, h.id, key)).slice(0, 4).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: cn("block size-1.5 rounded-full", HABIT_COLOR_CLASS[h.color].bg) }, h.id))
						}),
						habits.length > 0 && done > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: [Math.round(rate * 100), "% 完成"]
						}) : null
					]
				}, key);
			})
		})]
	});
}
function WeekGrid({ anchor, today, selected, habits, checks, onSelect, onToggle }) {
	const days = weekDays(anchor);
	const labels = weekdayLabels();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-xl bg-bg-elevated p-3 shadow-card md:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			style: { gridTemplateColumns: `minmax(4.5rem, 7rem) repeat(7, minmax(2.5rem, 1fr))` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
				days.map((day, i) => {
					const key = toKey(day);
					const isToday = isSameDay(day, today);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(key),
						className: cn("flex flex-col items-center rounded-md py-1 text-xs", key === selected && "bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: labels[i]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular", isToday && "font-medium text-accent"),
							children: format(day, "d")
						})]
					}, key);
				}),
				habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-8 py-6 text-center text-sm text-muted",
					children: "还没有习惯。"
				}) : habits.map((habit) => {
					const color = HABIT_COLOR_CLASS[habit.color];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contents",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center truncate pr-2 text-sm",
							children: habit.name
						}), days.map((day) => {
							const key = toKey(day);
							const on = isChecked(checks, habit.id, key);
							const future = isFutureDay(day, today);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: future,
								onClick: () => {
									onSelect(key);
									if (!future) onToggle(habit.id, key);
								},
								"aria-label": `${habit.name} ${key}`,
								className: cn("mx-auto flex size-10 items-center justify-center rounded-md border transition-colors duration-150", on ? cn(color.bg, "border-transparent text-accent-fg") : "border-border bg-bg", future && "opacity-30"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", on ? "opacity-100" : "opacity-0") })
							}, key);
						})]
					}, habit.id);
				})
			]
		})
	});
}
function CalendarPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarBoard, {});
}
//#endregion
export { CalendarPage as component };
