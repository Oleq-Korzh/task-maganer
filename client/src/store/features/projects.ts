import { API_ROUTES } from "@api/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  NewProjectPayload,
  Project,
  ProjectsState,
} from "./types/projects.types";

const initialState: ProjectsState = {
  data: [],
};

export const getProjectsAsync = createAsyncThunk<Project[]>(
  "projects/getList",
  async () => {
    const result = await axios.get<Project[]>(API_ROUTES.PROJECTS_URL);

    return result.data;
  }
);

export const saveProjectAsync = createAsyncThunk<Project, NewProjectPayload>(
  "projects/save",
  async (payload) => {
    const result = await axios.post<Project>(API_ROUTES?.PROJECTS_URL, payload);

    return result.data;
  }
);

export const deleteProjectAsync = createAsyncThunk<Project[], string>(
  "projects/delete",
  async (id) => {
    const result = await axios.delete<Project[]>(
      `${API_ROUTES?.PROJECTS_URL}/${id}`
    );

    return result.data;
  }
);

export const editProjectAsync = createAsyncThunk<
  Project[],
  { id: string; payload: Partial<Project> }
>("projects/edit", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const result = await axios.put(
      `${API_ROUTES?.PROJECTS_URL}/${id}`,
      payload
    );

    return result.data;
  } catch (error) {
    console.log(error);

    return rejectWithValue(error);
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(getProjectsAsync.rejected, (state, action) => {
      state.data = [];
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(deleteProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(saveProjectAsync.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(saveProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(editProjectAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(editProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });
  },
});

export default projectsSlice.reducer;
