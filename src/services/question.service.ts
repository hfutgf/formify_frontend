import { queryConfig } from "@/config/query.config";
import { Common } from ".";

export class QuestionService extends Common {
  getQuestionByTemplateId = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get(
        queryConfig.GET_QUESTIONS + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };
}
