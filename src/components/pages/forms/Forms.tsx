import { queryConfig } from "@/config/query.config";
import { FormService } from "@/services/form.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import FormCard from "@/components/shared/forms/FormCard";

const Forms = () => {
  const { templateId } = useParams();

  const formService = new FormService();

  const { isLoading: isGetFormsPending, data: forms } = useQuery({
    queryKey: [queryConfig.CRUD_FORMS, Number(templateId)],
    queryFn: async () => await formService.getFormTemplate(Number(templateId)),
  });

  if (isGetFormsPending) {
    return <Loading />;
  }
  return (
    <div className="bg-greenLight">
      <div className="container mx-auto min-h-[calc(100vh-70px)] p-[24px]">
        <div className="flex items-center gap-[24px]">
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
