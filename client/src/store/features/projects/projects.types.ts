import { EntityState } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export type NewProjectPayload = Omit<Project, "id">;

export type ProjectsState = EntityState<Project, string>;
