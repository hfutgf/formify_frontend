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
        queryConfig.CURD_TEMPLATES
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
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
      console.error(e.response?.data);
    }
  };

  create = async (body: TypeCreateTemplate) => {
    try {
      const response = await this.axiosWithAuth.post<ITemplate>(
        queryConfig.CURD_TEMPLATES,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getOneTempalte = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get(
        queryConfig.CURD_TEMPLATES + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  update = async (templateId?: number, body?: FormData) => {
    try {
      const response = await this.axiosWithAuth.put<ITemplate>(
        queryConfig.CURD_TEMPLATES + "/" + templateId,
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
      console.error(e.response?.data);
    }
  };

  removeImage = async (templateId?: number) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.REMOVE_TEMPLATE_IMG + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
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
      console.error(e.response?.data);
    }
  };

  deleteTemplate = async (templateId?: number) => {
    try {
      const response = await this.axiosWithAuth.delete<ITemplate>(
        queryConfig.CURD_TEMPLATES + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getUserTemplates = async (userId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<IGetTemplates[]>(
        "/user" + queryConfig.CURD_TEMPLATES + "/" + userId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getTemplatesByTheme = async (theme?: string) => {
    try {
      if (theme === "ALL") {
        return await this.getAll();
      }
      const response = await this.axiosWithAuth.get<IGetTemplates>(
        "/theme" + queryConfig.CURD_TEMPLATES + "/?theme=" + theme
      );
      return [response.data];
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
