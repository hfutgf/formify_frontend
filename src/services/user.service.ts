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
      return response;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
      return e.response;
    }
  };
}
