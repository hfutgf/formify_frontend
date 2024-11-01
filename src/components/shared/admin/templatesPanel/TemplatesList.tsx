import { IGetTemplates } from "@/types/template.types";
import TemplateCards from "../../dashboard/TemplateCards";
import Loading from "@/components/pages/loading/Loading";

interface Props {
  templates: IGetTemplates[];
  getByThemeLoading: boolean;
}

const TemplatesList = ({ templates, getByThemeLoading }: Props) => {
  if (getByThemeLoading) {
    return <Loading />;
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
