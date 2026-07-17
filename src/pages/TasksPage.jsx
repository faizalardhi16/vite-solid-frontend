import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { FilterBar } from "@/components/tasks/FilterBar";
import { useTasks } from "@/hooks/useTasks";
import { useAuthStore } from "@/stores/authStore";

/**
 * TasksPage — SINGLE RESPONSIBILITY: compose the tasks page.
 * Only wiring: hooks → components. No business logic.
 */
export function TasksPage() {
  const token = useAuthStore((s) => s.token);
  const {
    filteredTasks,
    isLoading,
    error,
    filter,
    setFilter,
    fetchTasks,
    createTask,
    updateStatus,
    deleteTask,
  } = useTasks();

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <FilterBar value={filter} onChange={setFilter} />
      </div>
      <TaskForm onSubmit={createTask} isLoading={isLoading} />
      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        error={error}
        onDelete={deleteTask}
        onStatusChange={updateStatus}
      />
    </div>
  );
}
