import { TASKS_PRIORITIES } from "@constants/taskPriorities";
import { TASK_STATUS } from "@constants/taskStatus";

import { IdType } from "./id.types";

export interface TaskProps {
  id: IdType;
  title: string;
  description: string;
  priority: TaskPriotiryProps;
  status: TaskStatusProps;
  assignee: string;
  projectId: string;
  createdAt: string;
}

export type TaskFormProps = Omit<TaskProps, "createdAt" | "id">;

export type TaskStatusProps = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export type TaskPriotiryProps =
  (typeof TASKS_PRIORITIES)[keyof typeof TASKS_PRIORITIES];

export type TasksColumnsProps = Record<TaskStatusProps, TaskProps[]>;
