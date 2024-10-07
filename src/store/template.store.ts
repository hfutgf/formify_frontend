import { IQuestion } from "@/types/question.type";
import { IGetTemplates, ITemplate } from "@/types/template.types";
import { create } from "zustand";

type Store = {
  themes: string[];
  template: ITemplate | null;
  setTemplate: (template: ITemplate) => void;
  templates: IGetTemplates[];
  setTemplates: (templates: IGetTemplates[]) => void;
  questions: IQuestion[] | null;
  setQuestions: (questions: IQuestion[]) => void;
};

const useTemplateStore = create<Store>()((set) => ({
  themes: [],
  template: null,
  setTemplate: (template) => set(() => ({ template })),
  templates: [],
  setTemplates: (templates) => set(() => ({ templates })),
  questions: null,
  setQuestions: (questions) => set(() => ({ questions })),
}));

export default useTemplateStore;
