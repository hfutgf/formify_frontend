import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IQuestion, TypeQuestionForm } from "@/types/question.type";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  questionService: QuestionService;
  setQuestion: (question: IQuestion) => void;
  questionTypes: string[] | undefined;
}

const CreateQuestion = ({
  questionService,
  setQuestion,
  questionTypes,
}: Props) => {
  const [questionType, setQuestionType] = useState("");
  const [visible, setVisible] = useState("");

  const { user } = useUserStore();
  const { template } = useTemplateStore();
  const { register, handleSubmit, reset } = useForm<TypeQuestionForm>();

  const { isPending: isCreateQuestionPending, mutate: createQuestion } =
    useMutation({
      mutationKey: [queryConfig.CURD_QUESTION, template?.id],
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

  return user?.id === template?.authorId || user?.role === "ADMIN" ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[65%] mx-auto bg-white dark:bg-black rounded-md p-[12px] flex flex-col gap-[12px]"
    >
      <Input {...register("title", { required: true })} placeholder="Title" />
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
  );
};

export default CreateQuestion;
