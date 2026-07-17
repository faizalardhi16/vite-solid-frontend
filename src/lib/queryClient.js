import { QueryClient } from "@tanstack/react-query";

/**
 * queryClient — SINGLE RESPONSIBILITY: React Query configuration.
 * Default: NO CACHE (staleTime: 0, gcTime: 0).
 * Set { cache: true } per-query to opt into caching.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,        // always considered stale → refetch every mount
      gcTime: 0,           // no garbage-collection retention → instant eviction
      refetchOnWindowFocus: true,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

/**
 * Build query options with optional cache override.
 * Only sets staleTime/gcTime when cache is NOT enabled.
 *
 * @param {boolean} cache — opt-in to default React Query caching
 * @returns {{ staleTime: number, gcTime: number }} — overrides to merge
 */
export function cacheOptions(cache = false) {
  if (cache) return {};
  return { staleTime: 0, gcTime: 0 };
}
