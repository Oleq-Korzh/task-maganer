import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/auth";
import projectsReducer from "./features/projects/projects";
import tasksReducer from "./features/tasks/tasks";
import usersReducer from "./features/users/users";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
