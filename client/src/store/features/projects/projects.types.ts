import { ProjectTypes } from "@models/project.types";
import { EntityState } from "@reduxjs/toolkit";

export type NewProjectPayload = Omit<ProjectTypes, "id">;

export type ProjectsState = EntityState<ProjectTypes, string>;
