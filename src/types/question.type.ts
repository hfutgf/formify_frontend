export enum QuestionType {
  TEXT = "TEXT",
  MULTICHOICE = "MULTICHOICE",
  RADIO = "RADIO",
}

export interface IQuestion {
  id: number;
  templateId: number;
  questionType?: QuestionType | string;
  title?: string;
  description?: string;
  order?: number;
  isVisible?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOption {
  id: number;
  questionId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TypeQuestionForm = Omit<
  IQuestion,
  "id" | "templateId" | "createdAt"
>;
