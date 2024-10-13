import { queryConfig } from "@/config/query.config";
import { Common } from "./common.service";
import { IOption, IQuestion, TypeQuestionForm } from "@/types/question.type";
import { AxiosError } from "axios";

export class QuestionService extends Common {
  create = async (templateId: number | undefined, body: TypeQuestionForm) => {
    try {
      const response = await this.axiosWithAuth.post<IQuestion>(
        queryConfig.CREATE_QUESTION + "/" + templateId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  getQuestionByTemplateId = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IQuestion[]>(
        queryConfig.GET_QUESTIONS + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  getOptions = async (questionId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.get<IOption[]>(
        queryConfig.GET_OPTIONS + "/" + questionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
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
      console.log(e.response?.data);
    }
  };

  updateQuestion = async (
    questonId: number | undefined,
    body: TypeQuestionForm
  ) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.UPDATE_QUESTION + "/" + questonId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  createOption = async (questionId: number) => {
    try {
      const response = await this.axiosWithAuth.post<IOption>(
        queryConfig.CREATE_OPTION + "/" + questionId,
        { text: "" }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  updateOption = async (
    optionId: number | undefined,
    body: { text: string }
  ) => {
    try {
      const response = await this.axiosWithAuth.put(
        queryConfig.UPDATE_OPTION + "/" + optionId,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };

  deleteOption = async (optionId: number | undefined) => {
    try {
      const response = await this.axiosWithAuth.delete(
        queryConfig.UPDATE_OPTION + "/" + optionId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log(e.response?.data);
    }
  };
}
