import { queryConfig } from "@/config/query.config";
import { FormService } from "@/services/form.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import FormCard from "@/components/shared/forms/FormCard";
import { useTranslation } from "react-i18next";
import useFormsStore from "@/store/forms.store";

const Forms = () => {
  const { templateId } = useParams();
  const { t } = useTranslation();
  const { setForms, forms } = useFormsStore();

  const formService = new FormService();

  const { isLoading: isGetFormsPending } = useQuery({
    queryKey: [queryConfig.CRUD_FORMS, Number(templateId)],
    queryFn: async () => {
      const data = await formService.getFormTemplate(Number(templateId));
      if (data) setForms(data);
      return data;
    },
    enabled: !!templateId,
  });

  if (isGetFormsPending) {
    return <Loading />;
  }
  return (
    <div className="bg-greenLight dark:bg-dark">
      <div className="container mx-auto min-h-[calc(100vh-70px)] p-[24px]">
        <h1 className="text-[20px]">{t("forms")}:</h1>
        <div className="flex items-center gap-[24px] mt-[16px]">
          {forms
            ?.sort(
              (a, b) =>
                new Date(b.submittedAt).getTime() -
                new Date(a.submittedAt).getTime()
            )
            .map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Forms;
