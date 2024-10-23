import { queryConfig } from "@/config/query.config";
import { Common } from "./common.service";
import { IOption, IQuestion, TypeQuestionForm } from "@/types/question.type";
import { AxiosError } from "axios";

export class QuestionService extends Common {
  create = async (templateId: number | undefined, body: TypeQuestionForm) => {
    try {
      const response = await this.axiosWithAuth.post<IQuestion>(
        queryConfig.CURD_QUESTION + "/" + templateId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getQuestionByTemplateId = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IQuestion[]>(
        queryConfig.CURD_QUESTION + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  deleteQuestion = async (questionId?: number) => {
    try {
      const response = await this.axiosWithAuth.delete<IQuestion>(
        queryConfig.CURD_QUESTION + "/" + questionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getQuestionTypes = async () => {
    try {
      const response = await this.axiosWithAuth.get<string[]>(
        queryConfig.GET_QUESTION_TYPES
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getOptions = async (questionId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.get<IOption[]>(
        queryConfig.CURD_OPTION + "/" + questionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  updateQuestion = async (
    questonId: number | undefined,
    body: TypeQuestionForm
  ) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.CURD_QUESTION + "/" + questonId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  createOption = async (questionId: number) => {
    try {
      const response = await this.axiosWithAuth.post<IOption>(
        queryConfig.CURD_OPTION + "/" + questionId,
        { text: "" }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  updateOption = async (optionId?: number, body?: { text: string }) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.CURD_OPTION + "/" + optionId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  updateQuestionsOrders = async (ids: number[]) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.UPDATE_QUESTIONS_ORDERS,
        {
          ids,
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  updateOptionsOrder = async (ids: number[], questionId?: number) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.UPDATE_OPTIONS_ORDER + "/" + questionId,
        {
          ids,
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  deleteOption = async (optionId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.delete(
        queryConfig.CURD_OPTION + "/" + optionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getQuestion = async (questionId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.get<IQuestion>(
        queryConfig.CURD_QUESTION + "/question/" + questionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
