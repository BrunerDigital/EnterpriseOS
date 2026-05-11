import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-primary/14 text-sky-200 ring-1 ring-primary/25",
      secondary: "bg-secondary text-secondary-foreground ring-1 ring-border",
      success: "bg-emerald-500/12 text-emerald-200 ring-1 ring-emerald-400/25",
      warning: "bg-amber-500/12 text-amber-200 ring-1 ring-amber-400/25",
      destructive: "bg-destructive/14 text-red-200 ring-1 ring-destructive/25"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
