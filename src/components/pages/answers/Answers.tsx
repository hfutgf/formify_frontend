import { queryConfig } from "@/config/query.config";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { AnswerService } from "@/services/answer.service";
import AnswerCard from "@/components/shared/answers/AnswerCard";

const FormPage = () => {
  const { formId } = useParams();
  const answerService = new AnswerService();

  const { isLoading: getAnswersPending, data: answers } = useQuery({
    queryKey: [queryConfig.CURD_ANSWER, Number(formId)],
    queryFn: async () => answerService.getAnswersByForm(Number(formId)),
  });
  if (getAnswersPending) {
    return <Loading />;
  }
  return (
    <div className="bg-greenLight min-h-[calc(100vh-70px)]">
      <div className="container mx-auto p-[24px]">
        <div className="w-[65%] mx-auto flex flex-col gap-[24px">
          {answers?.map((answer) => (
            <AnswerCard answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
