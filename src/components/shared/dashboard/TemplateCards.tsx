import { ITemplate } from "@/types/template.types";
import TemplateCard from "./TemplateCard";

interface Props {
  theme: string;
  templates: ITemplate[];
}

const TemplateCards = ({ theme, templates }: Props) => {
  return (
    <div className="w-full p-[24px]">
      <h4 className="text-[18px] font-[500] text-start text-dark">{theme}</h4>
      <div className="mt-[20px] flex items-center flex-wrap gap-[16px]">
        {templates.map((item) => (
          <TemplateCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TemplateCards;
