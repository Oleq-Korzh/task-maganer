import AuthPage from "../pages/AuthPage/AuthPage";
import EditProject from "../pages/EditProject/EditProject";
import EditTask from "../pages/EditTask/EditTask";
import MainPage from "../pages/MainPage/MainPage";
import NewProjectPage from "../pages/NewProjectPage/NewProjectPage";
import NewTaskPage from "../pages/NewTaskPage/NewTaskPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import TasksPage from "../pages/TasksPage/TasksPage";

import { AppRouteProps } from "./types/router.types";
import { APP_ROUTES } from "./routes";

export const menuItems: AppRouteProps[] = [
  {
    path: APP_ROUTES.HOME_URL,
    title: "Main",
    Component: MainPage,
  },
  {
    path: APP_ROUTES.PROJECTS_URL,
    title: "Projects",
    Component: ProjectsPage,
    protected: true,
  },
  {
    path: APP_ROUTES.NEW_PROJECT_URL,
    hideInMenu: true,
    Component: NewProjectPage,
    protected: true,
  },
  {
    path: APP_ROUTES.SINGLE_PROJECT,
    hideInMenu: true,
    Component: TasksPage,
    protected: true,
  },
  {
    path: APP_ROUTES.EDIT_PROJECT,
    hideInMenu: true,
    Component: EditProject,
    protected: true,
  },
  {
    path: APP_ROUTES.TASKS_URL,
    title: "Tasks",
    Component: TasksPage,
    protected: true,
  },
  {
    path: APP_ROUTES.NEW_TASK_URL,
    hideInMenu: true,
    Component: NewTaskPage,
    protected: true,
  },
  {
    path: APP_ROUTES.NEW_TASK_IN_PROJECT_URL,
    hideInMenu: true,
    Component: NewTaskPage,
    protected: true,
  },
  {
    path: APP_ROUTES.EDIT_TASK,
    hideInMenu: true,
    Component: EditTask,
    protected: true,
  },
  {
    path: APP_ROUTES.AUTH,
    title: "Auth",
    Component: AuthPage,
    public: true,
  },
];
