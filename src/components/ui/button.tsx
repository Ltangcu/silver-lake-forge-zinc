import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-(--motion-quick) ease-(--ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover",
        ghost: "bg-transparent text-ink hover:bg-paper-2",
        outline: "border border-line bg-paper-1 text-ink hover:bg-paper-2",
        quiet: "bg-paper-2 text-ink-soft hover:bg-paper-3 hover:text-ink",
      },
      size: {
        md: "h-11 rounded-lg px-4 text-sm",
        sm: "h-9 rounded-md px-3 text-sm",
        icon: "size-11 rounded-lg",
        iconSm: "size-9 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(function Button({ className, variant, size, type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});
