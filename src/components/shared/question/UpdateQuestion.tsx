import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import { IQuestion, TypeQuestionForm } from "@/types/question.type";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Props {
  question: IQuestion | undefined;
  setQuestion: Dispatch<SetStateAction<IQuestion | undefined>>;
}

const UpdateQuestion = ({ question, setQuestion }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [clickTitle, setClickTitle] = useState(false);
  const [clickDescription, setClickDescription] = useState(false);

  const questionService = new QuestionService();

  const { isPending: updatedQuestionPending, mutate: updateQuestion } =
    useMutation({
      mutationKey: [queryConfig.CURD_QUESTION, question?.id],
      mutationFn: async (body: TypeQuestionForm) =>
        await questionService.updateQuestion(question?.id, body),
      onSuccess: (data) => {
        setQuestion(data);
      },
    });

  const onSubmitClickTitle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQuestion({ title, updatedAt: new Date() });
    setClickTitle(false);
  };
  const onSubmitClickDescription = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQuestion({ description, updatedAt: new Date() });
    setClickDescription(false);
  };
  return (
    <>
      {clickTitle ? (
        <form
          className="flex items-center gap-[12px]"
          onSubmit={onSubmitClickTitle}
        >
          <Input
            required
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={question?.title}
          />
          <Button
            disabled={updatedQuestionPending}
            type="submit"
            className="bg-primary1 hover:bg-primary1/80 duration-200 text-white"
          >
            Ok
          </Button>
          <Button
            onClick={() => setClickTitle(false)}
            variant={"destructive"}
            type="button"
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-center ">
          <h4
            onDoubleClick={() => setClickTitle(true)}
            className="text-[20px] font-[500]"
          >
            <abbr className="no-underline w-full cursor-text" title="Double click to change">
              {question?.title}
            </abbr>
          </h4>
        </div>
      )}

      {clickDescription ? (
        <form
          className="flex items-center gap-[8px]"
          onSubmit={onSubmitClickDescription}
        >
          <Input
            required
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={question?.description}
          />
          <Button
            disabled={updatedQuestionPending}
            type="submit"
            className="bg-primary1 hover:bg-primary1/80 duration-200 text-white"
          >
            Ok
          </Button>
          <Button
            onClick={() => setClickDescription(false)}
            variant={"destructive"}
            type="button"
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-start">
          <p
            onDoubleClick={() => setClickDescription(true)}
            className="text-[16px] font-[400] w-full cursor-text"
          >
            <abbr className="no-underline" title="Double click to change">
              {question?.description}
            </abbr>
          </p>
        </div>
      )}
    </>
  );
};

export default UpdateQuestion;
