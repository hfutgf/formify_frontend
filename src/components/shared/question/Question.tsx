import { IQuestion } from "@/types/question.type";
import { GripHorizontal } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import { useEffect, useState } from "react";
import Options from "../options/Options";
import UpdateQuestion from "./UpdateQuestion";

interface Props {
  initialQuestion: IQuestion;
  index: number;
}

const Question = ({ initialQuestion, index }: Props) => {
  const [question, setQuestion] = useState<IQuestion>();

  const { user } = useUserStore();
  const { template } = useTemplateStore();

  useEffect(() => {
    setQuestion(initialQuestion);
  }, [initialQuestion]);

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
          className="w-full mx-auto bg-white dark:bg-black rounded-md p-[12px_20px] flex flex-col gap-[12px]"
        >
          {user?.id === template?.authorId || user?.role === "ADMIN" ? (
            <div className="w-full flex items-center justify-center">
              <div {...provided.dragHandleProps}>
                <GripHorizontal
                  size={20}
                  className="text-gray hover:text-black duration-100 hover:cursor-move"
                />
              </div>
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
