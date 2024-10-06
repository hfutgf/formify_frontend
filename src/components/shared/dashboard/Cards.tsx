import { ITemplate } from "@/types/template.types";
import Card from "./Card";

interface Props {
  theme: string;
  templates: ITemplate[];
}

const Cards = ({ theme, templates }: Props) => {
  return (
    <div className="w-full p-[24px]">
      <h4 className="text-[18px] font-[500] text-start text-dark">{theme}</h4>
      <div className="mt-[20px] flex items-center flex-wrap gap-[16px]">
        {templates.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
