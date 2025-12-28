import { RootState } from "@store/store";

import { tasksAdapter } from "./tasks.adapter";

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectEntities: selectTasksEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTasksTotal,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);
