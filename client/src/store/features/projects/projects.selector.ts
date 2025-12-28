import { RootState } from "@store/store";

import { projectsAdapter } from "./projects.adapter";

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectEntities: selectProjectsEntities,
  selectIds: selectProjectIds,
  selectTotal: selectProjectsTotal,
} = projectsAdapter.getSelectors((state: RootState) => state.projects);
