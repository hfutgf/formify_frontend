import {
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
  TypeRegisterResponse,
} from "@/types/auth.types";
import { Common } from "./common.service";
import { queryConfig } from "@/config/query.config";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export class AuthService extends Common {
  ACCESS_TOKEN = "accessToken";
  login = async (data: ILoginForm) => {
    try {
      const response = await this.axiosWithOutAuth.post<ILoginResponse>(
        queryConfig.LOGIN,
        data
      );
      Cookies.set(this.ACCESS_TOKEN, response.data.accessToken, {
        expires: 1,
      });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
      return e.response?.data;
    }
  };

  register = async (data: Omit<IRegisterForm, "confirmPassword">) => {
    try {
      const response = await this.axiosWithOutAuth.post<TypeRegisterResponse>(
        queryConfig.REGISTER,
        data
      );
      Cookies.set(this.ACCESS_TOKEN, response.data.accessToken, {
        expires: 1,
      });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
      return e.response?.data;
    }
  };

  logout = async () => {
    try {
      const response = await this.axiosWithAuth.post(queryConfig.LOGOUT);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };
}
