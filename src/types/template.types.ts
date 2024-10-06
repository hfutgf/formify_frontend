export interface ITemplate {
  id: number;
  authorId: number;
  title: string;
  description?: string;
  theme?: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type TypeCreateTemplate = Omit<
  ITemplate,
  "id" | "imageUrl" | "description" | "updatedAt" | "createdAt"
>;
