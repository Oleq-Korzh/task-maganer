const API_BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
  PROJECTS_URL: `${API_BASE_URL}/projects`,
  TASKS_URL: `${API_BASE_URL}/tasks`,
  USER: {
    LOGIN_URL: `${API_BASE_URL}/login`,
    LOGOUT_URL: `${API_BASE_URL}/logout`,
    LOGIN_CHECK_URL: `${API_BASE_URL}/login/check`,
  },
  USERS: `${API_BASE_URL}/users`,
} as const;
