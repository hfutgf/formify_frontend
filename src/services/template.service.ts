import { Common } from "./common.service";
import {
  IGetTemplates,
  ITemplate,
  TypeCreateTemplate,
} from "@/types/template.types";
import { queryConfig } from "@/config/query.config";
import { AxiosError } from "axios";

export class TemplateService extends Common {
  getAll = async () => {
    try {
      const response = await this.axiosWithOutAuth.get<IGetTemplates[]>(
        queryConfig.GET_TEMPLATES
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  getThemes = async () => {
    try {
      const response = await this.axiosWithOutAuth.get<string[]>(
        queryConfig.GET_TEMPLATE_THEMES
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  create = async (body: TypeCreateTemplate) => {
    try {
      const response = await this.axiosWithAuth.post<ITemplate>(
        queryConfig.CREATE_TEMPLATE,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  getOneTempalte = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get(
        queryConfig.GET_TEMPLATE + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  update = async (templateId: number | undefined, body: FormData) => {
    try {
      const response = await this.axiosWithAuth.put<ITemplate>(
        queryConfig.UPDATE_TEMPLATE + "/" + templateId,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  removeImage = async (templateId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.REMOVE_TEMPLATE_IMG + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  searchTemplate = async (title: string) => {
    try {
      const response = await this.axiosWithAuth.get(
        queryConfig.SEARCH_TEMPLATE + "?title=" + title
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  deleteTemplate = async (templateId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.delete<ITemplate>(
        queryConfig.DELETE_TEMPLATE + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };
}
