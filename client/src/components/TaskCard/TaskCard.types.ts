import { TaskProps } from "@models/task.types";

export type TaskCardProps = Omit<TaskProps, "assignee" | "projectId">;
