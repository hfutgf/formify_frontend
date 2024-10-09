import { IGetTemplates, ITemplate } from "@/types/template.types";
import { create } from "zustand";

type Store = {
  themes: string[];
  template: ITemplate | null;
  setTemplate: (template: ITemplate) => void;
  templates: IGetTemplates[];
  setTemplates: (templates: IGetTemplates[]) => void;
};

const useTemplateStore = create<Store>()((set) => ({
  themes: [],
  template: null,
  setTemplate: (template) => set(() => ({ template })),
  templates: [],
  setTemplates: (templates) => set(() => ({ templates })),
}));

export default useTemplateStore;
