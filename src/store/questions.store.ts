import { IOption, IQuestion } from "@/types/question.type";
import { create } from "zustand";

type Store = {
  questions: IQuestion[] | null;
  setQuestion: (question: IQuestion) => void;
  setQuestions: (questions: IQuestion[]) => void;
  options: IOption[];
  setOption: (option: IOption) => void;
  setOpions: (options: IOption[]) => void;
};

const useQuestionsStore = create<Store>()((set) => ({
  questions: null,
  setQuestion: (question) =>
    set((state) => {
      let newQuestions = [];
      if (!state.questions) {
        newQuestions.push(question);
      }
      newQuestions = [...state.questions!, question];
      return {
        questions: newQuestions,
      };
    }),
  setQuestions: (questions) => set(() => ({ questions })),
  options: [],
  setOption: (option) =>
    set((state) => {
      let newOptions = [];
      if (!state.options) {
        newOptions.push(option);
      }
      newOptions = [...state.options!, option];
      return {
        options: newOptions,
      };
    }),
  setOpions: (options) => set(() => ({ options })),
}));

export default useQuestionsStore;
