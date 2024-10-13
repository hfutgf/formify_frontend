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

const DeleteTemplate = () => {
  const { setTemplates, templates, template } = useTemplateStore();

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
    <>
      <AlertDialog>
        <AlertDialogTrigger
          disabled={deleteTempaltePending}
          onClick={() => deleteTempalte()}
          className="bg-red text-white rounded-md p-2 flex items-center gap-[4px]"
        >
          <Trash2 size={20} />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTemplate;
