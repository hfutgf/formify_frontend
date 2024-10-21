import { queryConfig } from "@/config/query.config";
import { Common } from "./common.service";
import { AxiosError } from "axios";
import { IUser, TypeUpdateUser } from "@/types/user.types";

export class UserService extends Common {
  constructor() {
    super();
  }

  getUser = async (id?: number) => {
    try {
      const response = await this.axiosWithOutAuth.get<IUser>(
        queryConfig.GET_USER + "/" + id
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  update = async (userId: number, body: TypeUpdateUser) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.CRUD_USERS + "/" + userId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getAllUsers = async (adminId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<IUser[]>(
        queryConfig.CRUD_USERS + "/all/" + adminId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getUsersByRole = async (
    role?: "USER" | "ADMIN" | string,
    adminId?: number
  ) => {
    try {
      if (role === "ALL") {
        return await this.getAllUsers(adminId);
      }
      const response = await this.axiosWithAuth.get<IUser[]>(
        queryConfig.CRUD_USERS + "/role/" + adminId + `?role=${role}`
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
