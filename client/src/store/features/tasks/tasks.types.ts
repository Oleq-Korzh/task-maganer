import { IdType } from "@models/id.types";
import { TaskProps } from "@models/task.types";
import { EntityState } from "@reduxjs/toolkit";

export type TasksInitialState = EntityState<TaskProps, IdType>;
