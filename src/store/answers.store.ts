import { IAnswerForm } from "@/types/answer.types";
import { create } from "zustand";

type Store = {
  answers: IAnswerForm[];
  setAnswer: (answer: IAnswerForm) => void;
};

const useAnswersStore = create<Store>()((set) => ({
  answers: [],
  setAnswer: (answer) =>
    set((state) => {
      const filterAnswers = state.answers.filter(
        (item) => item.questionId !== answer.questionId
      );
      const newAnswers = [...filterAnswers, answer];
      return {
        answers: newAnswers,
      };
    }),
}));

export default useAnswersStore;
