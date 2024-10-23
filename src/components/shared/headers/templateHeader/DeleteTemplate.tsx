import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import routesConfig from "@/config/routes.config";
import { useTranslation } from "react-i18next";

const DeleteTemplate = () => {
  const { setTemplates, templates, template } = useTemplateStore();
  const { t } = useTranslation();

  const tempalteService = new TemplateService();
  const navigate = useNavigate();

  const { isPending: deleteTempaltePending, mutate: deleteTempalte } =
    useMutation({
      mutationKey: [queryConfig.CURD_TEMPLATES, template?.id],
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
        navigate(routesConfig.DASHBOARD);
        setTemplates(filter);
      },
    });
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red text-white rounded-md p-2 flex items-center gap-[4px]">
          <Trash2 size={20} />
          {t("delete")}
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("Are you sure you want to delete this template?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("If you delete it, it will be impossible to restore it.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <div className="space-x-4 w-full flex items-center justify-end">
              <AlertDialogAction
                disabled={deleteTempaltePending}
                onClick={() => deleteTempalte()}
                className="bg-red hover:bg-red/80 duration-200"
              >
                {t("continue")}
              </AlertDialogAction>
              <AlertDialogCancel className="m-0">
                {t("cancel")}
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTemplate;
