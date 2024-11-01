import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Pencil } from "lucide-react";
import EditTemplateForm from "./EditTemplateForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const EditTemplateModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const templateService = new TemplateService();
  const { isLoading: isThemesPending, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  return (
    <Dialog onOpenChange={(value) => setOpenModal(value)} open={openModal}>
      <DialogTrigger className="h-10 px-4 py-2 inline-flex items-center gap-[4px] justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ">
        <Pencil size={20} />
        {t("edit")}
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-[16px]">Change your template</DialogTitle>
          {isThemesPending ? (
            <LoaderCircle className="text-blue animate-spin" size={32} />
          ) : (
            <EditTemplateForm setOpenModal={setOpenModal} themes={themes} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTemplateModal;
