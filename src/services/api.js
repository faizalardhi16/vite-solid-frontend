import axios from "axios";

/**
 * apiClient — SINGLE RESPONSIBILITY: HTTP transport configuration.
 * Only Axios instance + interceptors. No business logic.
 */
const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear stale token
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  },
);

export { apiClient };

/**
 * AuthAPI — SINGLE RESPONSIBILITY: auth HTTP calls.
 * Only request/response mapping. No state, no UI.
 */
export const AuthAPI = {
  login: (data) =>
    apiClient.post("/auth/login", data).then((r) => r.data),
};

/**
 * TasksAPI — SINGLE RESPONSIBILITY: tasks HTTP calls.
 * Only request/response mapping. No state, no UI.
 */
export const TasksAPI = {
  list: (userId) =>
    apiClient
      .get("/tasks", { params: userId ? { userId } : {} })
      .then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/tasks/${id}`).then((r) => r.data),

  create: (data) =>
    apiClient.post("/tasks", data).then((r) => r.data),

  update: (id, data) =>
    apiClient.patch(`/tasks/${id}`, data).then((r) => r.data),

  delete: (id) => apiClient.delete(`/tasks/${id}`),
};
