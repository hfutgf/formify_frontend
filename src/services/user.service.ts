import { queryConfig } from "@/config/query.config";
import { Common } from "./common.service";
import { AxiosError } from "axios";

export class UserService extends Common {
  constructor() {
    super();
  }

  getUser = async (id: number) => {
    try {
      const response = await this.axiosWithOutAuth.get(
        queryConfig.GET_USER + "/" + id
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };
}
