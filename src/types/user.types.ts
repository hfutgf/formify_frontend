type Role = "USER" | "ADMIN";
type Status = "ACTIVE" | "BLOCK";

export interface IUser {
  id: number;
  fullName?: string;
  email?: string;
  role?: Role;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type TypeUpdateUser = Omit<
  IUser,
  "createdAt" | "updatedAt" | "id" | "status"
> & {
  password?: string;
  oldPassword?: string;
};
