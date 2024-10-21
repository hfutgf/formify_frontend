import TemplateCards from "@/components/shared/dashboard/TemplateCards";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useUserStore from "@/store/users.store";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const MyTemplates = () => {
  const { user } = useUserStore();
  const templateService = new TemplateService();

  const { data: templates, isLoading: getTemplatesPending } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATES, user?.id],
    queryFn: async () => await templateService.getUserTemplates(user?.id),
    enabled: !!user?.id,
  });

  return getTemplatesPending ? (
    <div className="h-full flex items-center justify-center">
      <Loader className="animate-spin" size={20} />
    </div>
  ) : (
    <div>
      {templates?.map((item) =>
        item?.data?.length ? (
          <TemplateCards
            key={item?.theme}
            theme={item?.theme}
            templates={item?.data}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default MyTemplates;
