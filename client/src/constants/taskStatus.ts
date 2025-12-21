export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  BLOCKED: "blocked",
  TESTING: "testing",
  DONE: "done",
} as const;

export const DEFAULT_TASK_STATUS = Object.values(TASK_STATUS)[0];
