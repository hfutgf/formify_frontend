import { ArrowLeft, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormService } from "@/services/form.service";
import useFormsStore from "@/store/forms.store";
import { useTranslation } from "react-i18next";

const AnswerHeader = () => {
  const { authorId, formId } = useParams();
  const { removeForm } = useFormsStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userService = new UserService();
  const formService = new FormService();

  const { data: author } = useQuery({
    queryKey: [queryConfig.CRUD_USERS, authorId],
    queryFn: async () => await userService.getUser(Number(authorId)),
    enabled: !!authorId,
  });

  const { isPending: deleteFormPending } = useMutation({
    mutationKey: [queryConfig.CRUD_FORMS, formId],
    mutationFn: async () => await formService.removeForm(Number(formId)),
    onSuccess: (data) => {
      if (data) removeForm(data);
    },
  });
  return (
    <div className="bg-white min-h-[70px] max-h-[70px] flex items-center dark:bg-black border-b shadow-sm">
      <div className={cn("container mx-auto grid grid-cols-[3fr_6fr_3fr]")}>
        <div className="flex items-center justify-start">
          <ArrowLeft
            onClick={() => navigate(-1)}
            size={28}
            className="cursor-pointer hover:opacity-75 duration-300"
          />
        </div>
        <div className="flex items-center justify-center">
          <Link
            to={"/profile"}
            className="flex text-[18px] font-[500] hover:opacity-80 duration-300"
          >
            {author?.fullName}
          </Link>
        </div>
        <div className="flex justify-end">
          <Button disabled={deleteFormPending} variant={"destructive"}>
            <Trash2 size={20} />
            <span>{t("delete")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerHeader;
