import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — SINGLE RESPONSIBILITY: merge Tailwind classes intelligently.
 * Only class merging. No component logic.
 *
 * @param {...(string | undefined | null | boolean)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
