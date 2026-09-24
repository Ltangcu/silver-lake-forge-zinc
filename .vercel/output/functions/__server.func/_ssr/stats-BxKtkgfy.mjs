import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as format } from "../_libs/date-fns.mjs";
import { a as dayCompletion, c as perfectDayStreak, h as toKey, i as currentStreak, n as useStore, p as lastNDays, r as completionInRange, s as longestStreak, y as cn } from "./router-BUXqW4l2.mjs";
import { n as HABIT_COLOR_CLASS } from "./types-BDzVSBvY.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-BxKtkgfy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatsPanel() {
	const habits = useStore((s) => s.habits);
	const checks = useStore((s) => s.checks);
	const days14 = (0, import_react.useMemo)(() => lastNDays(14), []);
	const days30 = (0, import_react.useMemo)(() => lastNDays(30), []);
	const chart = days14.map((d) => {
		const { rate, done, total } = dayCompletion(habits, checks, toKey(d));
		return {
			key: toKey(d),
			label: format(d, "d"),
			rate: Math.round(rate * 100),
			done,
			total
		};
	});
	const perfect = perfectDayStreak(habits, checks);
	const today = dayCompletion(habits, checks, toKey(/* @__PURE__ */ new Date()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-2xl font-medium tracking-tight",
				children: "统计"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "看连续，也看完成的密度。"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "今日完成",
						value: `${today.done}/${today.total || 0}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "全勤连续",
						value: `${perfect} 天`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						className: "col-span-2 md:col-span-1",
						label: "近三十日均",
						value: habits.length ? `${Math.round(days30.reduce((a, d) => a + dayCompletion(habits, checks, toKey(d)).rate, 0) / days30.length * 100)}%` : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-bg-elevated p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-medium text-muted",
					children: "近十四日完成率"
				}), habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted",
					children: "完成几次打卡后，这里会出现柱状图。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-44",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							barCategoryGap: "18%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									tickLine: false,
									axisLine: false,
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									hide: true,
									domain: [0, 100]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "var(--color-surface)" },
									content: ({ active, payload }) => {
										if (!active || !payload?.[0]) return null;
										const row = payload[0].payload;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md bg-bg-elevated px-3 py-2 text-xs shadow-card",
											children: [
												row.done,
												"/",
												row.total,
												" · ",
												row.rate,
												"%"
											]
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "rate",
									fill: "var(--color-accent)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: "每项习惯"
				}), habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "还没有习惯可统计。"
				}) : habits.map((habit) => {
					const color = HABIT_COLOR_CLASS[habit.color];
					const cur = currentStreak(habit, checks);
					const longest = longestStreak(habit, checks);
					const month = completionInRange(habit, checks, days30);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-bg-elevated p-4 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", color.bg) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium",
									children: habit.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-3 grid grid-cols-3 gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "当前连续"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-serif text-xl tabular",
										children: cur
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "最长连续"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 font-serif text-xl tabular",
										children: longest
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted",
										children: "近三十日"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "mt-1 font-serif text-xl tabular",
										children: [Math.round(month.rate * 100), "%"]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 overflow-hidden rounded-full bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full", color.bg),
									style: { width: `${Math.round(month.rate * 100)}%` }
								})
							})
						]
					}, habit.id);
				})]
			})
		]
	});
}
function Stat({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl bg-bg-elevated p-4 shadow-card", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-serif text-2xl tabular",
			children: value
		})]
	});
}
function StatsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsPanel, {});
}
//#endregion
export { StatsPage as component };
