export interface ITemplate {
  id: number;
  authorId: number;
  title: string;
  description?: string;
  theme: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type TypeCreateTemplate = Omit<
  ITemplate,
  "id" | "imageUrl" | "description" | "updatedAt" | "createdAt"
>;

export type TypeUpdateTemplate = Omit<
  ITemplate,
  "id" | "createdAt" | "imageUrl"
>;

export interface IGetTemplates {
  theme: string | undefined;
  data: ITemplate[] | undefined;
}

export interface ITemplateLike {
  id: number;
  userId: number;
  templateId: number;
  value: "LIKE" | "DISLIKE";
}
