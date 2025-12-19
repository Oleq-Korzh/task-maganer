import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth";
import projectsReducer from "./features/projects";
import tasksReducer from "./features/tasks";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
