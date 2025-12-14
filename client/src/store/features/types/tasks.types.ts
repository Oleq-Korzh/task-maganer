export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  projectId: string;
  createdAt: string;
}

export interface TasksState {
  data: Task[];
}
