export interface Project {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export type NewProjectPayload = Omit<Project, "id">;

export interface ProjectsState {
  data: Project[];
}
