import { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { FilterBar } from "@/components/tasks/FilterBar";
import {
  useTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/hooks/useTaskQueries";
import { useTaskFilterStore, applyFilter } from "@/stores/taskStore";
import { useAuthStore } from "@/stores/authStore";

/**
 * TasksPage — SINGLE RESPONSIBILITY: compose the tasks page.
 * Only wiring: hooks → components. No business logic.
 */
export function TasksPage() {
  const token = useAuthStore((s) => s.token);
  const filter = useTaskFilterStore((s) => s.filter);
  const setFilter = useTaskFilterStore((s) => s.setFilter);

  // React Query: server state (no cache by default)
  const { data: tasks = [], isLoading, error } = useTasksQuery();

  // Mutations
  const createMutation = useCreateTaskMutation();
  const updateMutation = useUpdateTaskMutation();
  const deleteMutation = useDeleteTaskMutation();

  // Derived: client-side filter (pure function)
  const filteredTasks = applyFilter(tasks, filter);

  // Error from any mutation takes priority
  const mutationError =
    createMutation.error?.message ??
    updateMutation.error?.message ??
    deleteMutation.error?.message ??
    null;
  const displayError = (error?.message ?? mutationError) || null;

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleCreate = useCallback(
    async (title, description) => {
      await createMutation.mutateAsync({ title, description, status: "todo" });
    },
    [createMutation],
  );

  const handleStatusChange = useCallback(
    async (id, status) => {
      await updateMutation.mutateAsync({ id, data: { status } });
    },
    [updateMutation],
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteMutation.mutateAsync(id);
    },
    [deleteMutation],
  );

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <FilterBar value={filter} onChange={setFilter} />
      </div>
      <TaskForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading || isMutating}
        error={displayError}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
