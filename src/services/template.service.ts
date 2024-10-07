import { Common } from ".";
import {
  IGetTemplates,
  ITemplate,
  TypeCreateTemplate,
} from "@/types/template.types";
import { queryConfig } from "@/config/query.config";

export class TemplateService extends Common {
  getAll = async () => {
    try {
      const response = await this.axiosWithOutAuth.get<IGetTemplates[]>(
        queryConfig.GET_TEMPLATES
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };

  getThemes = async () => {
    try {
      const response = await this.axiosWithOutAuth.get<string[]>(
        queryConfig.GET_TEMPLATE_THEMES
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
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
      const e = error as Error;
      console.log(e.message);
    }
  };

  getOne = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get(
        queryConfig.GET_TEMPLATE + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };
}
