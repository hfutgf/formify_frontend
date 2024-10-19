import { AxiosError } from "axios";
import { Common } from "./common.service";
import { IComment, TypeFormComment } from "@/types/comment.types";
import { queryConfig } from "@/config/query.config";

export class CommentSerivce extends Common {
  constructor() {
    super();
  }

  createComment = async (body: TypeFormComment) => {
    try {
      const response = await this.axiosWithAuth.post<IComment>(
        queryConfig.CRUD_COMMENTS,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getComments = async (templateId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IComment[]>(
        queryConfig.CRUD_COMMENTS + "/" + templateId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
