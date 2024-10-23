import { CirclePlus, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/services/template.service";
import { queryConfig } from "@/config/query.config";
import CreateTemplateForm from "./CreateTemplateForm";
import { useTranslation } from "react-i18next";

const CreateTemplate = () => {
  const { t } = useTranslation();
  const templateService = new TemplateService();
  const { isLoading: isThemesPending, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  return (
    <Dialog>
      <DialogTrigger className="w-[192px] h-[120px] bg-white dark:bg-black flex items-center justify-center border rounded-md cursor-pointer hover:border hover:border-pink shadow-md overflow-hidden">
        <CirclePlus size={36} className="text-pink" />
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle className="text-[18px] text-center font-[500]">
          {t("create-template")}
        </DialogTitle>
        {isThemesPending ? (
          <LoaderCircle className="text-blue animate-spin" size={32} />
        ) : (
          <CreateTemplateForm themes={themes} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplate;
