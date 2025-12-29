import { API_ROUTES } from "@api/apiRoutes";
import { IdType } from "@models/id.types";
import { TaskProps } from "@models/task.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

import { tasksAdapter } from "./tasks.adapter";
import { TasksInitialState } from "./tasks.types";

const initialState: TasksInitialState = tasksAdapter.getInitialState();

export const getTasksAsync = createAsyncThunk<TaskProps[], IdType | undefined>(
  "tasks/getList",
  async (projectId = "") => {
    const result = await axios.get<TaskProps[]>(
      `${API_ROUTES.TASKS_URL}/${projectId}`
    );

    return result.data;
  }
);

export const saveTaskAsync = createAsyncThunk<TaskProps, Partial<TaskProps>>(
  "tasks/save",
  async (task, { getState }) => {
    const currentState = getState() as RootState;
    const userId = currentState?.auth?.user?.id;

    const taskWithUser = {
      ...task,
      creatorId: userId,
    };

    const result = await axios.post<TaskProps>(
      API_ROUTES.TASKS_URL,
      taskWithUser
    );

    return result.data;
  }
);

export const deleteTaskAsync = createAsyncThunk<TaskProps[], IdType>(
  "tasks/delete",
  async (id) => {
    const result = await axios.delete<TaskProps[]>(
      `${API_ROUTES.TASKS_URL}/${id}`
    );

    return result.data;
  }
);

export const editTaskAsync = createAsyncThunk<
  TaskProps[],
  { id: string; payload: Partial<TaskProps> }
>("tasks/edit", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const result = await axios.put<TaskProps[]>(
      `${API_ROUTES.TASKS_URL}/${id}`,
      payload
    );

    return result.data;
  } catch (error) {
    console.log(error);

    return rejectWithValue(error);
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAsync.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload);
    });

    builder.addCase(getTasksAsync.rejected, (state, action) => {
      tasksAdapter.setAll(state, []);
      console.error(action?.error?.message);
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload);
    });

    builder.addCase(deleteTaskAsync.rejected, (_, action) => {
      console.error(action?.error?.message);
    });

    builder.addCase(editTaskAsync.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload);
    });

    builder.addCase(editTaskAsync.rejected, (_, action) => {
      console.error(action?.error?.message);
    });

    builder.addCase(saveTaskAsync.fulfilled, (state, action) => {
      tasksAdapter.addOne(state, action.payload);
    });

    builder.addCase(saveTaskAsync.rejected, (_, action) => {
      console.error(action?.error?.message);
    });
  },
});

export default tasksSlice.reducer;
