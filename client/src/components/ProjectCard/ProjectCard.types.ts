import { TaskPriotiryProps } from "@models/task.types";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  priority: TaskPriotiryProps;
  onClick?: (id: string) => void;
}
