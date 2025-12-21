export const TASKS_PRIORITIES = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export const DEFAULT_TASK_PRIORITY = Object.values(TASKS_PRIORITIES)[0];
