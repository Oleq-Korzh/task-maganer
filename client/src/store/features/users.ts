import { API_ROUTES } from "@api/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UserInitialStateProps } from "./types/user.types";

const initialState: UserInitialStateProps = {
  data: [],
  isInit: false,
};

export const getUsersAsync = createAsyncThunk("users/getList", async () => {
  const result = await axios.get(`${API_ROUTES.USERS}`);

  return result.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      console.log(action);

      state.data = action.payload;
      state.isInit = true;
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {
      state.data = [];
      state.isInit = false;
      console.error(action?.error?.message);
    });
    // builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
    // builder.addCase(deleteTaskAsync.rejected, (_, action) => {
    //   console.error(action?.error?.message);
    // });
    // builder.addCase(editTaskAsync.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
    // builder.addCase(editTaskAsync.rejected, (_, action) => {
    //   console.error(action?.error?.message);
    // });
    // builder.addCase(saveTaskAsync.fulfilled, (state, action) => {
    //   state.data.push(action.payload);
    // });
    // builder.addCase(saveTaskAsync.rejected, (_, action) => {
    //   console.error(action?.error?.message);
    // });
  },
});

export default usersSlice.reducer;
