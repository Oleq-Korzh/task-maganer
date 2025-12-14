import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TasksState } from "./types/tasks.types";

const initialState: TasksState = {
  data: [],
};

/*
{
  id: string,
  title: string,
  description: string,
  priority: string,
  status: string,
  assignee: string,
  projectId: string,
}
*/

const TASKS_URL = "http://localhost:3000/tasks";

export const getTasksAsync = createAsyncThunk<Task[], string | undefined>(
  "tasks/getList",
  async (projectId = "") => {
    const result = await axios.get<Task[]>(`${TASKS_URL}/${projectId}`);
    return result.data;
  }
);

export const saveTaskAsync = createAsyncThunk<Task, Partial<Task>>(
  "tasks/save",
  async (task) => {
    const result = await axios.post<Task>(TASKS_URL, task);
    return result.data;
  }
);

export const deleteTaskAsync = createAsyncThunk<Task[], string>(
  "tasks/delete",
  async (id) => {
    const result = await axios.delete(`${TASKS_URL}/${id}`);

    return result.data;
  }
);

export const editTaskAsync = createAsyncThunk<
  Task[],
  { id: string; payload: Partial<Task> }
>("tasks/edit", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const result = await axios.put(`${TASKS_URL}/${id}`, payload);

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
      state.data = action.payload;
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(editTaskAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(saveTaskAsync.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});

export default tasksSlice.reducer;
