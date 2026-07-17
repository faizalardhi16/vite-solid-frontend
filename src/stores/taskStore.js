import { create } from "zustand";
import { TasksAPI } from "@/services/api";

/**
 * TaskStore — SINGLE RESPONSIBILITY: task state management.
 * Only state + task CRUD actions. No HTTP directly — delegates to TasksAPI.
 */
export const useTaskStore = create((set) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  filter: "all",

  fetchTasks: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await TasksAPI.list(userId);
      set({ tasks, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load tasks";
      set({ error: message, isLoading: false });
    }
  },

  fetchTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const task = await TasksAPI.getById(id);
      set({ selectedTask: task, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load task";
      set({ error: message, isLoading: false });
    }
  },

  createTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await TasksAPI.create(data);
      set((state) => ({ tasks: [...state.tasks, newTask], isLoading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create task";
      set({ error: message, isLoading: false });
    }
  },

  updateTask: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await TasksAPI.update(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
        selectedTask: state.selectedTask?.id === id ? updated : state.selectedTask,
        isLoading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update task";
      set({ error: message, isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await TasksAPI.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      set({ error: message, isLoading: false });
    }
  },

  setFilter: (filter) => set({ filter }),

  clearError: () => set({ error: null }),
}));

/**
 * filteredTasks — derived selector (no extra state, pure function).
 */
export const useFilteredTasks = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const filter = useTaskStore((s) => s.filter);
  if (filter === "all") return tasks;
  return tasks.filter((t) => t.status === filter);
};
