import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTemplate from "../../modals/editTemplateModal/EditTemplateModal";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import { useMutation } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";

const TemplateHeader = () => {
  const { user } = useUserStore();
  const { template, setTemplates, templates } = useTemplateStore();
  const navigate = useNavigate();

  const tempalteService = new TemplateService();

  const { isPending: deleteTempaltePending, mutate: deleteTempalte } =
    useMutation({
      mutationKey: [queryConfig.DELETE_TEMPLATE, template?.id],
      mutationFn: async () =>
        await tempalteService.deleteTemplate(template?.id),
      onSuccess: (data) => {
        const filter = templates.map((item) => {
          const filterTemplates = item?.data?.filter((i) => i.id !== data?.id);
          return {
            theme: item?.theme,
            data: filterTemplates,
          };
        });
        setTemplates(filter);
      },
    });

  return (
    <div className="bg-white dark:bg-black border-b shadow-sm">
      <div className="container mx-auto grid grid-cols-[3fr_6fr_3fr]">
        <div className="flex items-center justify-start">
          <ArrowLeft
            onClick={() => navigate(-1)}
            size={28}
            className="cursor-pointer hover:opacity-75 duration-300"
          />
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-end justify-center">
          navs
        </div>
        <div className="flex items-center justify-end space-x-4">
          {user?.id === template?.authorId || user?.role === "ADMIN" ? (
            <div className="flex items-center space-x-4">
              <EditTemplate />
              <Button
                disabled={deleteTempaltePending}
                onClick={() => deleteTempalte()}
                variant={"destructive"}
              >
                Delete template
              </Button>
            </div>
          ) : (
            <></>
          )}
          <Button className="bg-primary1 dark:text-white hover:bg-primary1/80 duration-200 w-[30%]">
            Send answers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateHeader;
