import { create } from "zustand";
import { AuthAPI } from "@/services/api";

/**
 * AuthStore — SINGLE RESPONSIBILITY: auth state management.
 * Only state + auth actions. No HTTP directly — delegates to AuthAPI.
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken, user } = await AuthAPI.login({ email, password });
      localStorage.setItem("accessToken", accessToken);
      set({ user, token: accessToken, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ error: message, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));
