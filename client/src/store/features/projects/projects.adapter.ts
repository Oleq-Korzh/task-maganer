import { ProjectTypes } from "@models/project.types";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const projectsAdapter = createEntityAdapter<ProjectTypes>();
