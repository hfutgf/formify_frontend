type Role = "user" | "admin";
export interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
