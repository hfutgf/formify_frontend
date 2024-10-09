import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import { IQuestion, QuestionType } from "@/types/question.type";
import { useQuery } from "@tanstack/react-query";
import { GripHorizontal } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  question: IQuestion;
  index: number;
}

const Question = ({ question, index }: Props) => {
  const questionService = new QuestionService();
  const { data: options, isPending: optionsPending } = useQuery({
    queryKey: [queryConfig.GET_OPTIONS, question.id],
    queryFn: async () => await questionService.getOptions(question.id),
  });

  return (
    <Draggable
      key={question.id}
      draggableId={String(question.id)}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full mx-auto bg-white rounded-md p-[12px] flex flex-col gap-[12px]"
        >
          <div className="w-full flex items-center justify-center">
            <div {...provided.dragHandleProps}>
              <GripHorizontal
                size={20}
                className="text-gray hover:text-black duration-100 hover:cursor-move"
              />
            </div>
          </div>
          <h4 className="text-center text-[20px] font-[500]">
            {question.title}
          </h4>
          <p className="text-[16px] font-[400]">{question.description}</p>
          {question.questionType === QuestionType.TEXT ? (
            <Input placeholder="Answer" />
          ) : question.questionType === QuestionType.RADIO ? (
            <div>Radio group</div>
          ) : (
            <div className="flex flex-col gap-[8px]">
              {options?.map((option) => (
                <div key={option.id} className="flex items-center gap-[8px]">
                  <Checkbox disabled={optionsPending} />
                  <span>{option.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Question;
