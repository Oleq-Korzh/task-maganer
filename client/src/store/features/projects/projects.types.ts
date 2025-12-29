import { ProjectTypes } from "@models/project.types";
import { EntityState } from "@reduxjs/toolkit";

export type NewProjectPayload = Omit<ProjectTypes, "id" | "memberIds">;

export type ProjectsState = EntityState<ProjectTypes, string>;
