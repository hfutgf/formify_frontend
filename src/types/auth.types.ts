import { IUser } from "./user.types";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  fullName: string;
  confirmPassword:string
}

export interface ILoginResponse {
  data: IUser;
  accessToken: string;
}

export type TypeRegisterResponse = ILoginResponse;
