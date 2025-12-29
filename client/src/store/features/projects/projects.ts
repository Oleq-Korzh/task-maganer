import { API_ROUTES } from "@api/apiRoutes";
import { IdType } from "@models/id.types";
import { ProjectFormTypes, ProjectTypes } from "@models/project.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

import { projectsAdapter } from "./projects.adapter";
import { ProjectsState } from "./projects.types";

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
  ProjectFormTypes
>("projects/save", async (payload, { getState }) => {
  const currentState = getState() as RootState;
  const userId = currentState?.auth?.user?.id;

  const projectWithUser = {
    ...payload,
    creatorId: userId,
    memberIds: Array.from(new Set([userId, ...payload.memberIds])),
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
>("projects/edit", async ({ id, payload }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;

    const project = state.projects.entities[id];
    const currentUserId = state.auth.user?.id;

    if (!project) {
      throw new Error("Project not found");
    }

    const protectedIds = new Set<IdType>(
      [project.creatorId, currentUserId].filter(Boolean)
    );

    const safeMemberIds = payload.memberIds
      ? Array.from(new Set([...payload.memberIds, ...protectedIds]))
      : project.memberIds;

    const result = await axios.put(`${API_ROUTES.PROJECTS_URL}/${id}`, {
      ...payload,
      memberIds: safeMemberIds,
    });

    return result.data;
  } catch (error) {
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
      console.log(action.payload);

      projectsAdapter.addOne(state, action.payload);
    });

    builder.addCase(saveProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });

    builder.addCase(editProjectAsync.fulfilled, (state, action) => {
      console.log(action.payload);

      projectsAdapter.setAll(state, action.payload);
    });

    builder.addCase(editProjectAsync.rejected, (_, action) => {
      console.error(`Projects error: ${action?.error?.message}`);
    });
  },
});

export default projectsSlice.reducer;
