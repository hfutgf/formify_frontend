import { ITemplateLike } from "@/types/template.types";
import { Common } from "./common.service";
import { AxiosError } from "axios";
import { queryConfig } from "@/config/query.config";

export class TemplateLikesService extends Common {
  constructor() {
    super();
  }

  create = async (body: Omit<ITemplateLike, "id">) => {
    try {
      const response = await this.axiosWithAuth.post<ITemplateLike>(
        queryConfig.CRUD_TEMPLATE_LIKES,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  delete = async (likeId?: number) => {
    try {
      const response = await this.axiosWithAuth.delete<ITemplateLike>(
        queryConfig.CRUD_TEMPLATE_LIKES + "/" + likeId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getLikes = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get<ITemplateLike[]>(
        queryConfig.CRUD_TEMPLATE_LIKES + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getLike = async (templateId: number, userId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<ITemplateLike>(
        queryConfig.CRUD_TEMPLATE_LIKES + "/" + templateId + "/" + userId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
