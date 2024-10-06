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


