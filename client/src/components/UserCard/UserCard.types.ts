import { UserProps } from "@models/user.types";

export type UserCardProps = Omit<UserProps, "projects">;
