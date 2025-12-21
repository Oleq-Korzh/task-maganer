import { PROJECT_PRIORITIES } from "@constants/projectPriorities";

export interface ProjectTypes {
  id: string;
  title: string;
  description: string;
  priority: ProjectPriotiryProps;
}

export type ProjectFormTypes = Omit<ProjectTypes, "id">;

export type ProjectPriotiryProps =
  (typeof PROJECT_PRIORITIES)[keyof typeof PROJECT_PRIORITIES];
