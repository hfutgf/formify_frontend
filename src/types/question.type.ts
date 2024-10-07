enum QuestionType {
  TEXT,
  MULTICHOICE,
  CHECKBOX,
  RADIO,
}

export interface IQuestion {
  id: number;
  templateId: number;
  questionType: QuestionType;
  title: string;
  description: string;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
