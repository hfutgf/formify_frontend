import { IGetTemplates, ITemplate } from "@/types/template.types";
import { create } from "zustand";

type Store = {
  themes: string[];
  template: ITemplate | null;
  setTemplate: (template: ITemplate) => void;
  templates: (IGetTemplates | undefined)[];
  setTemplates: (templates: (IGetTemplates | undefined)[]) => void;
  serachTempaltes: ITemplate[];
  setSearchTemplates: (serachTempaltes: ITemplate[]) => void;
};

const useTemplateStore = create<Store>()((set) => ({
  themes: [],
  template: null,
  setTemplate: (template) => set(() => ({ template })),
  templates: [],
  setTemplates: (templates) => set(() => ({ templates })),
  serachTempaltes: [],
  setSearchTemplates: (serachTempaltes) => set(() => ({ serachTempaltes })),
}));

export default useTemplateStore;
