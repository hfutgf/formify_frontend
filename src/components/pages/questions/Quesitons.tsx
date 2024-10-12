import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { QuestionService } from "@/services/question.service";
import authenticationCheck from "@/utils/authenticationCheck";
import useQuestionsStore from "@/store/questions.store";
import QuestionList from "@/components/shared/question/QuestionList";
import CreateQuestion from "@/components/shared/question/CreateQuestion";

const Questions = () => {
  const { setTemplate, template } = useTemplateStore();
  const { setQuestions, setQuestion } = useQuestionsStore();

  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const templateService = new TemplateService();
  const questionService = new QuestionService();

  const { isLoading, data } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE, Number(templateId)],
    queryFn: async () =>
      await templateService.getOneTempalte(Number(templateId)),
  });

  const { isLoading: isPendingQuestion, data: questionsData } = useQuery({
    queryKey: [queryConfig.GET_QUESTIONS, Number(templateId)],
    queryFn: async () =>
      await questionService.getQuestionByTemplateId(Number(templateId)),
  });

  const { isLoading: isQuestionTypesPending, data: questionTypes } = useQuery({
    queryKey: [queryConfig.GET_QUESTION_TYPES],
    queryFn: async () => await questionService.getQuestionTypes(),
  });

  useEffect(() => {
    authenticationCheck(navigate, location);
  }, [location, navigate]);

  useEffect(() => {
    if (!isLoading) {
      if (data) setTemplate(data);
    }
  }, [data, isLoading, setTemplate]);

  useEffect(() => {
    if (questionsData) setQuestions(questionsData);
  }, [questionsData, setQuestions]);

  if (isLoading || isPendingQuestion || isQuestionTypesPending) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-greenLight dark:bg-dark">
      <div className="container mx-auto py-[32px] flex flex-col gap-[24px] select-none">
        <div className="w-[65%] mx-auto bg-white dark:bg-black rounded-md p-[12px] flex flex-col ">
          <h4 className="text-center text-[20px] font-[500]">
            {template?.title}
          </h4>
          <p className="text-[16px] font-[400]">{template?.description}</p>
        </div>
        <QuestionList />
        <CreateQuestion
          questionService={questionService}
          setQuestion={setQuestion}
          questionTypes={questionTypes}
        />
      </div>
    </div>
  );
};

export default Questions;
