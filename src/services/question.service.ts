import { queryConfig } from "@/config/query.config";
import { Common } from ".";
import { IOption, IQuestion, TypeQuestionForm } from "@/types/question.type";

export class QuestionService extends Common {
  create = async (templateId: number | undefined, body: TypeQuestionForm) => {
    try {
      const response = await this.axiosWithAuth.post<IQuestion>(
        queryConfig.CREATE_QUESTION + "/" + templateId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };

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

  getOptions = async (questionId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IOption[]>(
        queryConfig.GET_OPTIONS + "/" + questionId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };

  getQuestionTypes = async () => {
    try {
      const response = await this.axiosWithAuth.get<string[]>(
        queryConfig.GET_QUESTION_TYPES
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };
}
