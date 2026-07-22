"use client";

import { cn } from "@/lib/utils";

interface TerminalCursorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TerminalCursor({ className, size = "md" }: TerminalCursorProps) {
  const sizeClasses = {
    sm: "w-2 h-4",
    md: "w-2 h-6",
    lg: "w-3 h-8"
  };

  return (
    <span
      className={cn(
        "inline-block bg-primary animate-pulse",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
