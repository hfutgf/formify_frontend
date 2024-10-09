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

  getOneTempalte = async (templateId: number) => {
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
      const e = error as Error;
      console.log(e.message);
    }
  };

  removeImage = async (templateId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.REMOVE_TEMPLATE_IMG + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };
}
