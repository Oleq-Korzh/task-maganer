import { API_ROUTES } from "@api/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { usersAdapter } from "./users.adapter";

const initialState = usersAdapter.getInitialState({
  isInit: false,
});

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
      usersAdapter.setAll(state, action.payload);
      state.isInit = true;
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {
      usersAdapter.setAll(state, []);
      state.isInit = false;
      console.error(action?.error?.message);
    });
    // builder.addCase(saveTaskAsync.fulfilled, (state, action) => {
    //   state.data.push(action.payload);
    // });
    // builder.addCase(saveTaskAsync.rejected, (_, action) => {
    //   console.error(action?.error?.message);
    // });
  },
});

export default usersSlice.reducer;
