import FilterTemplates from "@/components/shared/admin/templatesPanel/FilterTemplates";
import TemplatesList from "@/components/shared/admin/templatesPanel/TemplatesList";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useUserStore from "@/store/users.store";
import { ITemplate } from "@/types/template.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const TemplatesPanel = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [getByThemeLoading, setGetByThemeLoading] = useState<boolean>(false);

  const { user } = useUserStore();

  const templateService = new TemplateService();

  const { isLoading: getTemplateLoading } = useQuery({
    queryKey: [queryConfig.CURD_TEMPLATES + "/all", user?.id],
    queryFn: async () => {
      const data = await templateService.getTemplates(user?.id);
      if (data) {
        setTemplates(data);
      }
    },
    enabled: !!user?.id,
  });

  return (
    <div className="flex flex-col gap-[16px] ">
      <FilterTemplates
        setTemplates={setTemplates}
        setGetByThemeLoading={setGetByThemeLoading}
      />
      <TemplatesList
        templates={templates}
        getByThemeLoading={getByThemeLoading}
        getTemplateLoading={getTemplateLoading}
      />
    </div>
  );
};

export default TemplatesPanel;
