import { useCallback } from "react";
import { useTaskStore, useFilteredTasks } from "@/stores/taskStore";

/**
 * useTasks — SINGLE RESPONSIBILITY: React hook for task interactions.
 * Only connects component to store. No state, no HTTP, no rendering.
 */
export function useTasks() {
  const tasks = useTaskStore((s) => s.tasks);
  const isLoading = useTaskStore((s) => s.isLoading);
  const error = useTaskStore((s) => s.error);
  const filter = useTaskStore((s) => s.filter);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const setFilter = useTaskStore((s) => s.setFilter);
  const clearError = useTaskStore((s) => s.clearError);
  const createTaskAction = useTaskStore((s) => s.createTask);

  const filteredTasks = useFilteredTasks();

  const createTask = useCallback(
    async (title, description) => {
      await createTaskAction({ title, description, status: "todo" });
    },
    [createTaskAction],
  );

  const updateStatus = useCallback(
    async (id, status) => {
      await updateTask(id, { status });
    },
    [updateTask],
  );

  return {
    tasks,
    filteredTasks,
    isLoading,
    error,
    filter,
    setFilter,
    fetchTasks,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    clearError,
  };
}
