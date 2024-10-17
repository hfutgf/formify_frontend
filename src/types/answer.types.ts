export interface IAnswer {
  id: number;
  formId: number;
  questionId: number;
  answerValue?: string;
}

export interface IForm {
  id: number;
  templateId: number;
  authorId: number;
  submittedAt: Date;
}

export interface IAnswerForm {
  formId: number;
  questionId: number;
  answerValue?: string;
  options?: string[];
}
