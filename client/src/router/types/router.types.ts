import { ComponentType, ReactNode } from "react";

export interface AppRouteProps {
  path: string;
  title?: string;
  Component: ComponentType;
  protected?: boolean;
  public?: boolean;
  hideInMenu?: boolean;
}

export interface CustomRouterProps {
  children: ReactNode;
}
