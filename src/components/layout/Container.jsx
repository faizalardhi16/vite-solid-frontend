import { cn } from "@/lib/utils";

/**
 * Container — SINGLE RESPONSIBILITY: constrain content width.
 * Only layout presentation. No logic.
 */
export function Container({ className, ...props }) {
  return (
    <div
      className={cn("mx-auto max-w-5xl px-4 py-8", className)}
      {...props}
    />
  );
}
