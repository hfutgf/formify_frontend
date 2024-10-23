import { IQuestion } from "@/types/question.type";
import { GripHorizontal, Trash2 } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import { useEffect, useState } from "react";
import UpdateQuestion from "./UpdateQuestion";
import Options from "../options/Options";
import { useMutation } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import { Button } from "@/components/ui/button";

interface Props {
  initialQuestion: IQuestion;
  index: number;
  setQuestions: (questions: IQuestion[]) => void;
  questions: IQuestion[];
}

const Question = ({
  initialQuestion,
  index,
  setQuestions,
  questions,
}: Props) => {
  const [question, setQuestion] = useState<IQuestion>();

  const { user } = useUserStore();
  const { template } = useTemplateStore();

  useEffect(() => {
    setQuestion(initialQuestion);
  }, [initialQuestion]);

  const questionService = new QuestionService();

  const { mutate: deleteQuestion, isPending: deleteQuestionPending } =
    useMutation({
      mutationKey: [queryConfig.CURD_QUESTION, question?.id],
      mutationFn: async () =>
        await questionService.deleteQuestion(question?.id),
      onSuccess: (data) => {
        if (data) {
          const filterQuestions = questions.filter(
            (item) => item.id !== data.id
          );
          setQuestions(filterQuestions);
        }
      },
    });

  return (
    <Draggable
      key={question?.id}
      draggableId={String(question?.id)}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full mx-auto bg-white dark:bg-black rounded-md p-[12px_20px] flex flex-col gap-[12px] group"
        >
          {user?.id === template?.authorId || user?.role === "ADMIN" ? (
            <div className="w-full flex items-center justify-center relative">
              <div {...provided.dragHandleProps}>
                <GripHorizontal
                  size={20}
                  className="text-gray hover:text-black duration-100 hover:cursor-move"
                />
              </div>
              <abbr title="Delete question">
                <div
                  onClick={() => deleteQuestion()}
                  className="absolute right-0 top-0 z-10 cursor-pointer "
                >
                  <Button
                    disabled={deleteQuestionPending}
                    className="p-0 h-0 border-none"
                  >
                    <Trash2
                      size={20}
                      className="hover:text-red text-black/70 duration-100"
                    />
                  </Button>
                </div>
              </abbr>
            </div>
          ) : (
            <></>
          )}
          {user?.id === template?.authorId || user?.role === "ADMIN" ? (
            <UpdateQuestion question={question} setQuestion={setQuestion} />
          ) : (
            <>
              <div className="flex items-center justify-center ">
                <h4 className="text-[20px] font-[500]">{question?.title}</h4>
              </div>
              <div className="flex items-center justify-start">
                <p className="text-[16px] font-[400]">
                  {question?.description}
                </p>
              </div>
            </>
          )}
          <Options question={question} />
        </div>
      )}
    </Draggable>
  );
};

export default Question;
