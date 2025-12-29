import { RootState } from "@store/store";

import { usersAdapter } from "./users.adapter";

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users);
