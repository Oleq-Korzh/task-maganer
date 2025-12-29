import { UserProps } from "@models/user.types";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const usersAdapter = createEntityAdapter<UserProps>();
