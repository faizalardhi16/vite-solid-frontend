import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TasksAPI } from "@/services/api";
import { cacheOptions } from "@/lib/queryClient";

const TASKS_KEY = ["tasks"];

/**
 * useTasksQuery — SINGLE RESPONSIBILITY: fetch tasks via React Query.
 * Default: no cache. Pass { cache: true } to opt into caching.
 *
 * @param {{ cache?: boolean, userId?: string }} options
 */
export function useTasksQuery({ cache = false, userId } = {}) {
  return useQuery({
    queryKey: [...TASKS_KEY, { userId }],
    queryFn: () => TasksAPI.list(userId),
    ...cacheOptions(cache),
  });
}

/**
 * useCreateTaskMutation — SINGLE RESPONSIBILITY: create task + invalidate list.
 */
export function useCreateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => TasksAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
}

/**
 * useUpdateTaskMutation — SINGLE RESPONSIBILITY: update task + invalidate list.
 */
export function useUpdateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => TasksAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
}

/**
 * useDeleteTaskMutation — SINGLE RESPONSIBILITY: delete task + invalidate list.
 */
export function useDeleteTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => TasksAPI.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
}
