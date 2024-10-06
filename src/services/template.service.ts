import { Common } from ".";
import { ITemplate } from "@/types/template.types";
import { queryConfig } from "@/config/query.config";

interface IGetAllResponse {
  theme: string;
  data: ITemplate[];
}

export class TemplateService extends Common {
  getAll = async () => {
    try {
      const response = await this.axiosWithOutAuth.get<IGetAllResponse[]>(
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
}
