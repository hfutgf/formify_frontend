import { Button } from "@/components/ui/button";
import { queryConfig } from "@/config/query.config";
import { AnswerService } from "@/services/answer.service";
import useAnswersStore from "@/store/answers.store";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IAnswerForm, IForm } from "@/types/answer.types";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SendForm = () => {
  const { answers } = useAnswersStore();
  const { template } = useTemplateStore();
  const { user } = useUserStore();
  const { t } = useTranslation();

  const answerService = new AnswerService();

  const { isPending: createFormPending, mutate: createForm } = useMutation({
    mutationKey: [queryConfig.CRUD_FORMS],
    mutationFn: async (body: Omit<IForm, "id">) =>
      await answerService.createForm(body),
    onSuccess: (data) => {
      answers.forEach((item) => {
        createAnswer({ ...item, formId: data!.id });
      });
      toast.success("Answers sent");
    },
  });

  const { isPending: createAnswerPending, mutate: createAnswer } = useMutation({
    mutationKey: [queryConfig.CURD_ANSWER],
    mutationFn: async (body: IAnswerForm) =>
      await answerService.createAnswer(body),
  });

  const onSend = async () => {
    createForm({
      templateId: template!.id,
      authorId: user!.id,
      submittedAt: new Date(),
    });
  };
  return (
    <Button
      disabled={createFormPending || createAnswerPending}
      onClick={onSend}
      className="flex items-center gap-[4px] bg-primary1 dark:text-white hover:bg-primary1/80 duration-200"
    >
      <Send size={20} />
      {t("send")}
    </Button>
  );
};

export default SendForm;
