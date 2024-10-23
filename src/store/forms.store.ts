import { IForm } from "@/types/answer.types";
import { create } from "zustand";

type Store = {
  forms: IForm[];
  removeForm: (form: IForm) => void;
  setForms: (forms: IForm[]) => void;
};

const useFormsStore = create<Store>()((set) => ({
  forms: [],
  setForms: (forms) =>
    set(() => ({
      forms,
    })),
  removeForm: (form) =>
    set((state) => {
      const filterForms = state.forms.filter((item) => item.id !== form.id);
      return { forms: filterForms };
    }), 
}));

export default useFormsStore;
