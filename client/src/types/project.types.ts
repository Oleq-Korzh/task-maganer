import { PROJECT_PRIORITIES } from "@constants/projectPriorities";

export interface ProjectTypes {
  id: string;
  title: string;
  description: string;
  priority: ProjectPriotiryProps;
  membersIds: string[];
  readonly creatorId: string;
}

export type ProjectFormTypes = Pick<
  ProjectTypes,
  "title" | "description" | "priority"
>;

export type ProjectPriotiryProps =
  (typeof PROJECT_PRIORITIES)[keyof typeof PROJECT_PRIORITIES];
