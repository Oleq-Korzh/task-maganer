import { ProjectTypes } from "@models/project.types";
import { EntityState } from "@reduxjs/toolkit";

export type ProjectsState = EntityState<ProjectTypes, string>;
