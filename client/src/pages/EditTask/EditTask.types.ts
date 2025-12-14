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

export interface NewTaskPayload {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  projectId: string;
}

export interface EditTaskPayload {
  id: string;
  payload: Partial<Task>;
}

export interface TasksState {
  data: Task[];
}
