export interface IComment {
  id: number;
  templateId: number;
  authorId: number;
  content: string;
  createdAt: Date;
}

export type TypeFormComment = Omit<IComment, "id" | "createdAt">;

export interface ICommentLike {
  id: number;
  userId: number;
  commentId: number;
  value: "LIKE" | "DISLIKE";
}
