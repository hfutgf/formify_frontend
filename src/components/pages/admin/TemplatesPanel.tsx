import FilterTemplates from "@/components/shared/admin/templatesPanel/FilterTemplates";
import TemplatesList from "@/components/shared/admin/templatesPanel/TemplatesList";
import { IGetTemplates } from "@/types/template.types";
import { useState } from "react";

const TemplatesPanel = () => {
  const [templates, setTemplates] = useState<IGetTemplates[]>([]);
  const [getByThemeLoading, setGetByThemeLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-[16px]">
      <FilterTemplates
        setTemplates={setTemplates}
        setGetByThemeLoading={setGetByThemeLoading}
      />
      <TemplatesList
        templates={templates}
        getByThemeLoading={getByThemeLoading}
      />
    </div>
  );
};

export default TemplatesPanel;
