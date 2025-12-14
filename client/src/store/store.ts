import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects";
import tasksReducer from "./features/tasks";
import authReducer from "./features/auth";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
