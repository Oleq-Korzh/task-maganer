import { IdType } from "@models/id.types";
import { TaskPriotiryProps } from "@models/task.types";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  priority: TaskPriotiryProps;
  creatorId: IdType;
  onClick?: (id: string) => void;
}
