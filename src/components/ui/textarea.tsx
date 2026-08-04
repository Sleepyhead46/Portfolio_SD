import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[140px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-secondary/60 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
