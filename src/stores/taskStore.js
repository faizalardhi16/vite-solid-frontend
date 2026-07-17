import { create } from "zustand";

/**
 * TaskFilterStore — SINGLE RESPONSIBILITY: client-side filter state only.
 * Server state (tasks, loading, errors) handled by React Query.
 */
export const useTaskFilterStore = create((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));

/**
 * applyFilter — pure function: filter tasks by status.
 * No React, no state — just data in, data out.
 *
 * @param {Array} tasks
 * @param {string} filter
 * @returns {Array}
 */
export function applyFilter(tasks, filter) {
  if (filter === "all") return tasks;
  return tasks.filter((t) => t.status === filter);
}
