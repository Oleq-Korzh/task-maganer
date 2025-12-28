export const APP_ROUTES = {
  HOME_URL: "/",
  NEW_PROJECT_URL: "/projects/new",
  PROJECTS_URL: "/projects",
  SINGLE_PROJECT: "/tasks/:projectId",
  EDIT_PROJECT: "/projects/:id/edit",
  TASKS_URL: "/tasks",
  NEW_TASK_URL: "/tasks/new",
  NEW_TASK_IN_PROJECT_URL: "/projects/:projectId/tasks/new",
  EDIT_TASK: "/tasks/:id/edit",
  AUTH: "/auth",
  USERS: "/users",
} as const;
