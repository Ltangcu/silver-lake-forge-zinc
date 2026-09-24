import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as Ellipsis, f as Check, o as Plus, r as Trash2, s as Pencil } from "../_libs/lucide-react.mjs";
import { a as dayCompletion, c as perfectDayStreak, g as todayKey, i as currentStreak, l as formatLong, n as useStore, o as isChecked, y as cn } from "./router-BUXqW4l2.mjs";
import { t as Button } from "./button-Bd8MhFZt.mjs";
import { n as HABIT_COLOR_CLASS, t as HABIT_COLORS } from "./types-BDzVSBvY.mjs";
import { a as DialogTitle, c as WordCard, i as DialogHeader, l as WordDetail, n as DialogContent, o as Input, r as DialogDescription, t as Dialog, u as dailyEntry } from "./lexicon-DSVZhJBJ.mjs";
import { a as Trigger, i as Root2$1, n as Item2, r as Portal2$1, t as Content2$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-R1MNId4o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-muted", className),
		...props
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-24 w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-base text-fg shadow-card", "placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35", "disabled:opacity-40", className),
	...props
}));
Textarea.displayName = "Textarea";
function HabitForm({ open, onOpenChange, habit, onSubmit }) {
	const [name, setName] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)("pine");
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(habit?.name ?? "");
			setNote(habit?.note ?? "");
			setColor(habit?.color ?? "pine");
		}
	}, [open, habit]);
	function handleSubmit(e) {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return;
		onSubmit({
			name: trimmed,
			note,
			color
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: habit ? "编辑习惯" : "新的日课" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: habit ? "改名字、备注或颜色标记。" : "立一条能每天完成的小事。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "habit-name",
						children: "名称"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "habit-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "例如：晨读",
						maxLength: 20,
						autoFocus: true,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "habit-note",
						children: "备注"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "habit-note",
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "给自己一句提醒，可选",
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "颜色" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: HABIT_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setColor(c.id),
							className: cn("flex size-11 items-center justify-center rounded-md ring-2 ring-transparent transition-[box-shadow,transform] duration-150", HABIT_COLOR_CLASS[c.id].bg, color === c.id && "ring-fg ring-offset-2 ring-offset-bg-elevated"),
							"aria-label": c.label,
							"aria-pressed": color === c.id,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-accent-fg",
								children: c.label
							})
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "取消"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: habit ? "保存" : "添加"
					})]
				})
			]
		})] })
	});
}
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 min-w-40 overflow-hidden rounded-lg bg-bg-elevated p-1 text-fg shadow-card", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none select-none", "focus:bg-surface", inset && "pl-8", variant === "danger" && "text-danger focus:bg-habit-rust/10", className),
		...props
	});
}
function HabitRow({ habit, dateKey, onEdit, onDelete }) {
	const checks = useStore((s) => s.checks);
	const toggleCheck = useStore((s) => s.toggleCheck);
	const on = isChecked(checks, habit.id, dateKey);
	const streak = currentStreak(habit, checks);
	const color = HABIT_COLOR_CLASS[habit.color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 rounded-lg bg-bg-elevated p-3 shadow-card transition-[box-shadow] duration-150", on && "shadow-card-hover"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => toggleCheck(habit.id, dateKey),
				"aria-pressed": on,
				"aria-label": on ? `取消完成 ${habit.name}` : `完成 ${habit.name}`,
				className: cn("relative flex size-12 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color,transform] duration-150", on ? cn(color.bg, "border-transparent text-accent-fg") : "border-border-strong bg-bg text-transparent hover:border-fg/30"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: cn("size-5 transition-[opacity,transform,filter] duration-200", on ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"),
					strokeWidth: 2.4
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: habit.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs tabular", color.text),
						children: streak > 0 ? `连续 ${streak} 天` : "待开始"
					})]
				}), habit.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm text-muted",
					children: habit.note
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `${habit.name} 更多`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => onEdit(habit),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "编辑"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					variant: "danger",
					onSelect: () => onDelete(habit),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "删除"]
				})]
			})] })
		]
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
function AlertDialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-fg/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2", "mx-4 rounded-xl bg-bg-elevated p-6 text-fg shadow-card", className),
		...props,
		children
	})] });
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-serif text-xl font-medium", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("mt-2 text-sm text-muted", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-6 flex justify-end gap-2", className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className,
			...props
		})
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			className,
			...props
		})
	});
}
function TodayView() {
	const habits = useStore((s) => s.habits);
	const checks = useStore((s) => s.checks);
	const addHabit = useStore((s) => s.addHabit);
	const updateHabit = useStore((s) => s.updateHabit);
	const deleteHabit = useStore((s) => s.deleteHabit);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const [openWord, setOpenWord] = (0, import_react.useState)(null);
	const date = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const key = todayKey();
	const entry = (0, import_react.useMemo)(() => dailyEntry(date), [date]);
	const { done, total } = dayCompletion(habits, checks, key);
	const perfect = perfectDayStreak(habits, checks);
	const allDone = total > 0 && done === total;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: formatLong(date)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl font-medium tracking-tight",
					children: "今日"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordCard, {
				entry,
				featured: true,
				onOpen: setOpenWord
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl font-medium",
						children: "日课"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [total === 0 ? "立一条能每天完成的小事" : allDone ? "今日功课已毕" : `${done} / ${total} 已完成`, perfect > 0 ? ` · 全勤 ${perfect} 天` : ""]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => {
							setEditing(null);
							setFormOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "添加"]
					})]
				}), habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-bg-elevated px-5 py-10 text-center shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg",
							children: "从一条日课开始"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "名字短一点，容易每天点亮。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-5",
							onClick: () => {
								setEditing(null);
								setFormOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "添加习惯"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitRow, {
						habit,
						dateKey: key,
						onEdit: (h) => {
							setEditing(h);
							setFormOpen(true);
						},
						onDelete: setDeleting
					}, habit.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitForm, {
				open: formOpen,
				onOpenChange: setFormOpen,
				habit: editing,
				onSubmit: (value) => {
					if (editing) updateHabit(editing.id, value);
					else addHabit(value);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(deleting),
				onOpenChange: (o) => !o && setDeleting(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
						"删除「",
						deleting?.name,
						"」？"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "这条习惯和它的打卡记录会一并从本机清除，无法恢复。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "取消" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => {
							if (deleting) deleteHabit(deleting.id);
							setDeleting(null);
						},
						children: "删除"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(openWord),
				onOpenChange: (o) => !o && setOpenWord(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "词句" }) }), openWord ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordDetail, {
					entry: openWord,
					onClose: () => setOpenWord(null)
				}) : null] })
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, {});
}
//#endregion
export { Home as component };
