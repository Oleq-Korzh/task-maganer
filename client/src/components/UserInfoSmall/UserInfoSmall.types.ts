import { UserProps } from "@models/user.types";

export type UserInfoTypes = Pick<UserProps, "name" | "avatarUrl">;
