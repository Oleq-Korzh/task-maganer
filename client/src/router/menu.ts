import { ComponentType } from "react";
import AuthPage from "../pages/AuthPage/AuthPage";
import EditProject from "../pages/EditProject/EditProject";
import EditTask from "../pages/EditTask/EditTask";
import MainPage from "../pages/MainPage/MainPage";
import NewProjectPage from "../pages/NewProjectPage/NewProjectPage";
import NewTaskPage from "../pages/NewTaskPage/NewTaskPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import TasksPage from "../pages/TasksPage/TasksPage";

interface AppRoute {
  path: string;
  title?: string;
  Component: ComponentType<any>;
  protected?: boolean;
  public?: boolean;
  hideInMenu?: boolean;
}

export const urls = {
  HOME_URL: "/",
  NEW_PROJECT_URL: "/projects/new",
  PROJECTS_URL: "/projects",
  SINGLE_PROJECT: "/tasks/:projectId",
  EDIT_PROJECT: "/projects/:id/edit",
  TASKS_URL: "/tasks",
  NEW_TASK_URL: "/tasks/new",
  NEW_TASK_IN_PROJECT_URL: "/projects/:projectId/tasks/new",
  EDIT_TASK: "/tasks/:id/edit",
  AUTH: "/auth",
};

export const menuItems: AppRoute[] = [
  {
    path: urls.HOME_URL,
    title: "Main",
    Component: MainPage,
  },
  {
    path: urls.PROJECTS_URL,
    title: "Projects",
    Component: ProjectsPage,
    protected: true,
  },
  {
    path: urls.NEW_PROJECT_URL,
    hideInMenu: true,
    Component: NewProjectPage,
    protected: true,
  },
  {
    path: urls.SINGLE_PROJECT,
    hideInMenu: true,
    Component: TasksPage,
    protected: true,
  },
  {
    path: urls.EDIT_PROJECT,
    hideInMenu: true,
    Component: EditProject,
    protected: true,
  },
  {
    path: urls.TASKS_URL,
    title: "Tasks",
    Component: TasksPage,
    protected: true,
  },
  {
    path: urls.NEW_TASK_URL,
    hideInMenu: true,
    Component: NewTaskPage,
    protected: true,
  },
  {
    path: urls.NEW_TASK_IN_PROJECT_URL,
    hideInMenu: true,
    Component: NewTaskPage,
    protected: true,
  },
  {
    path: urls.EDIT_TASK,
    hideInMenu: true,
    Component: EditTask,
    protected: true,
  },
  {
    path: urls.AUTH,
    title: "Auth",
    Component: AuthPage,
    public: true,
  },
];
