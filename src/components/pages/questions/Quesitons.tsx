import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { QuestionService } from "@/services/question.service";
import { TypeQuestionForm } from "@/types/question.type";
import authenticationCheck from "@/utils/authenticationCheck";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import useQuestionsStore from "@/store/questions.store";
import useUserStore from "@/store/users.store";
import QuestionList from "@/components/shared/question/QuestionList";

const Questions = () => {
  const [questionType, setQuestionType] = useState("");
  const [visible, setVisible] = useState("");

  const { setTemplate, template } = useTemplateStore();
  const { setQuestions, setQuestion } = useQuestionsStore();
  const { user } = useUserStore();

  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const templateService = new TemplateService();
  const questionService = new QuestionService();

  const { register, handleSubmit, reset } = useForm<TypeQuestionForm>();

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

  const { isPending: isCreateQuestionPending, mutate: createQuestion } =
    useMutation({
      mutationKey: [queryConfig.CREATE_QUESTION, template?.id],
      mutationFn: async (body: TypeQuestionForm) =>
        await questionService.create(template?.id, body),
      onSuccess: (data) => {
        reset();
        setVisible("");
        setQuestionType("");
        setQuestion(data!);
      },
    });

  const onSubmit: SubmitHandler<TypeQuestionForm> = async (data) => {
    createQuestion({
      ...data,
      questionType,
      isVisible: visible.length === 4 ? true : false,
    });
  };

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
        {user?.id === template?.authorId || user?.role === "ADMIN" ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[65%] mx-auto bg-white dark:bg-black rounded-md p-[12px] flex flex-col gap-[12px]"
          >
            <Input
              {...register("title", { required: true })}
              placeholder="Title"
            />
            <Textarea
              {...register("description", { required: true })}
              placeholder="Description"
            />
            <Select
              value={questionType}
              onValueChange={(value) => setQuestionType(value)}
              required
            >
              <SelectTrigger className="w-[25%]">
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                {questionTypes?.map((type) => (
                  <SelectItem key={type} className="capitalize" value={type}>
                    {type.slice(0, 1) + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <RadioGroup
              onValueChange={(value) => setVisible(value)}
              value={visible}
              required
              defaultValue="option-one"
              className="flex items-center gap-[24px] px-[12px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="option-one" />
                <Label htmlFor="option-one">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="option-two" />
                <Label htmlFor="option-two">Private</Label>
              </div>
            </RadioGroup>
            <Button
              disabled={isCreateQuestionPending}
              type="submit"
              className="bg-primary1 hover:bg-primary1/80 dark:text-white duration-200 mt-[12px] text-[16px]"
            >
              Add question
            </Button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Questions;
