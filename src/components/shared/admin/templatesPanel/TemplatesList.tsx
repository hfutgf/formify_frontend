import { IGetTemplates } from "@/types/template.types";
import TemplateCards from "../../dashboard/TemplateCards";
import { Loader } from "lucide-react";

interface Props {
  templates: IGetTemplates[];
  getByThemeLoading: boolean;
}

const TemplatesList = ({ templates, getByThemeLoading }: Props) => {
  if (getByThemeLoading) {
    return (
      <div className="flex items-center justify-center mt-[144px]">
        <Loader size={24} className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      {templates.map((item) => (
        <TemplateCards
          key={item.theme}
          templates={item.data}
          theme={item.theme}
        />
      ))}
    </div>
  );
};

export default TemplatesList;
