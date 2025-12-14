export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  createdAt: string;
  projectId: string;
}

export interface NewTaskPayload {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  projectId: string;
}

export interface ParamsTypes {
  projectId?: string;
  [key: string]: string | undefined;
}
