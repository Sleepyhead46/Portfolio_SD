import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-secondary/60 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
