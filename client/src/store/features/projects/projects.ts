import { API_ROUTES } from "@api/apiRoutes";
import { ProjectTypes } from "@models/project.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

import { projectsAdapter } from "./projects.adapter";
import { NewProjectPayload, ProjectsState } from "./projects.types";

const initialState: ProjectsState = projectsAdapter.getInitialState();

export const getProjectsAsync = createAsyncThunk<ProjectTypes[]>(
  "projects/getList",
  async () => {
    const result = await axios.get<ProjectTypes[]>(API_ROUTES.PROJECTS_URL);

    return result.data;
  }
);

export const saveProjectAsync = createAsyncThunk<
  ProjectTypes,
  NewProjectPayload
>("projects/save", async (payload, { getState }) => {
  const currentState = getState() as RootState;
  const userId = currentState?.auth?.user?.id;

  const projectWithUser = {
    ...payload,
    creatorId: userId,
    memberIds: [userId],
  };

  const result = await axios.post<ProjectTypes>(
    API_ROUTES?.PROJECTS_URL,
    projectWithUser
  );

  return result.data;
});

export const deleteProjectAsync = createAsyncThunk<ProjectTypes[], string>(
  "projects/delete",
  async (id) => {
    const result = await axios.delete<ProjectTypes[]>(
      `${API_ROUTES?.PROJECTS_URL}/${id}`
    );

    return result.data;
  }
);

export const editProjectAsync = createAsyncThunk<
  ProjectTypes[],
  { id: string; payload: Partial<ProjectTypes> }
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
      projectsAdapter.setAll(state, action.payload);
    });

    builder.addCase(getProjectsAsync.rejected, (state, action) => {
      projectsAdapter.setAll(state, []);
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      projectsAdapter.setAll(state, action.payload);
    });

    builder.addCase(deleteProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(saveProjectAsync.fulfilled, (state, action) => {
      projectsAdapter.addOne(state, action.payload);
    });

    builder.addCase(saveProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(editProjectAsync.fulfilled, (state, action) => {
      projectsAdapter.setAll(state, action.payload);
    });

    builder.addCase(editProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });
  },
});

export default projectsSlice.reducer;
