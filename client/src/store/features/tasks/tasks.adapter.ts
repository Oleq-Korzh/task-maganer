import { TaskProps } from "@models/task.types";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksAdapter = createEntityAdapter<TaskProps>();
