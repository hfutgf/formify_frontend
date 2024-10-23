import { AxiosError } from "axios";
import { Common } from "./common.service";
import { queryConfig } from "@/config/query.config";
import { IForm } from "@/types/answer.types";

export class FormService extends Common {
  constructor() {
    super();
  }

  getFormTemplate = async (tempalteId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<IForm[]>(
        queryConfig.CRUD_FORMS + "/" + tempalteId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  removeForm = async (formId?: number) => {
    try {
      const response = await this.axiosWithAuth.delete<IForm>(
        queryConfig.CRUD_FORMS + "/" + formId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
