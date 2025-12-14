export interface ParamsTypes {
  projectId?: string;
  [key: string]: string | undefined;
}

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
