export const USER_ROLES = {
  admin: "admin",
  qa: "qa",
  manager: "manager",
  developer: "developer",
} as const;

export const DEFAULT_USER_ROLES = Object.values(USER_ROLES)[0];
