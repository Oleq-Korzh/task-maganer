import { USER_ROLES } from "@constants/userRoles";

import { IdType } from "./id.types";

export interface UserProps {
  id: IdType;
  name: string;
  role: UserRoleProps;
  projects: IdType[];
  avatarUrl: string;
}

export type UserRoleProps = (typeof USER_ROLES)[keyof typeof USER_ROLES];
