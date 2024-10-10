import { IQuestion } from "@/types/question.type";
import { create } from "zustand";

type Store = {
  questions: IQuestion[] | null;
  setQuestion: (question: IQuestion) => void;
  setQuestions: (questions: IQuestion[]) => void;
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
}));

export default useQuestionsStore;
