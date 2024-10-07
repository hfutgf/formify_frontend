import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/template.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Question from "@/components/shared/template/Question";
import { QuestionService } from "@/services/question.service";
import { QuestionType } from "@/types/question.type";
import authenticationCheck from "@/utils/authenticationCheck";

const Template = () => {
  const { setTemplate, template, questions, setQuestions } = useTemplateStore();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const templateService = new TemplateService();
  const questionService = new QuestionService();

  useEffect(() => {
    authenticationCheck(navigate, location);
  }, [location, navigate]);

  const { isLoading, data } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE, Number(templateId)],
    queryFn: async () => await templateService.getOne(Number(templateId)),
  });

  const { isLoading: isPendingQuestion, data: questionsData } = useQuery({
    queryKey: [queryConfig.GET_QUESTIONS, Number(templateId)],
    queryFn: async () =>
      await questionService.getQuestionByTemplateId(Number(templateId)),
  });

  useEffect(() => {
    if (!isLoading) {
      if (data) setTemplate(data);
    }
  }, [data, isLoading, setTemplate]);

  useEffect(() => {
    if (!isPendingQuestion) {
      if (questionsData) setQuestions(questionsData);
    }
  }, [isPendingQuestion, questionsData, setQuestions]);

  if (isLoading && isPendingQuestion) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-greenLight">
      <div className="container mx-auto py-[32px] flex flex-col gap-[24px]">
        <div className="w-[65%] mx-auto bg-white rounded-md p-[12px] flex flex-col ">
          <h4 className="text-center text-[20px] font-[500]">
            {template?.title}
          </h4>
          <p className="text-[16px] font-[400]">{template?.description}</p>
        </div>
        {questions?.map((question) => (
          <Question
            key={question.id}
            question={{ ...question, questionType: QuestionType.MULTICHOICE }}
          />
        ))}
      </div>
    </div>
  );
};

export default Template;
