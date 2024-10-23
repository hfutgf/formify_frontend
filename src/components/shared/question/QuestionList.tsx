import { IQuestion } from "@/types/question.type";
import Question from "./Question";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import useQuestionsStore from "@/store/questions.store";
import { useMutation } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";

const reorder = (
  list: IQuestion[],
  startIndex: number,
  endIndex: number
): IQuestion[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const QuestionList = () => {
  const { questions, setQuestions } = useQuestionsStore();

  const questionService = new QuestionService();

  const { mutate } = useMutation({
    mutationKey: [queryConfig.UPDATE_QUESTIONS_ORDERS],
    mutationFn: async (ids: number[]) =>
      await questionService.updateQuestionsOrders(ids),
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedQuestions = reorder(
      questions!,
      result.source.index,
      result.destination.index
    );
    mutate(reorderedQuestions.map((item) => item.id));
    setQuestions(reorderedQuestions);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-[65%] mx-auto flex flex-col gap-[24px]"
          >
            {questions?.map((question, index) => (
              <Question
                key={String(question.id)}
                initialQuestion={question}
                setQuestions={setQuestions}
                questions={questions}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionList;
