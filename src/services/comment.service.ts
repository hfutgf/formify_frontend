import { AxiosError } from "axios";
import { Common } from "./common.service";
import { IComment, ICommentLike, TypeFormComment } from "@/types/comment.types";
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

  createCommentLike = async (body: Omit<ICommentLike, "id">) => {
    try {
      const response = await this.axiosWithAuth.post<ICommentLike>(
        queryConfig.CRUD_COMMENT_LIKES,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  deleteCommentLike = async (likeId?: number) => {
    try {
      const response = await this.axiosWithAuth.delete<ICommentLike>(
        queryConfig.CRUD_COMMENT_LIKES + "/" + likeId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getCommentLikes = async (commentId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<ICommentLike[]>(
        queryConfig.CRUD_COMMENT_LIKES + "/" + commentId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };

  getCheckUserLike = async (userId?: number, commentId?: number) => {
    try {
      const response = await this.axiosWithAuth.get<ICommentLike>(
        queryConfig.CRUD_COMMENT_LIKES + "/" + commentId + "/" + userId
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error(e.response?.data);
    }
  };
}
