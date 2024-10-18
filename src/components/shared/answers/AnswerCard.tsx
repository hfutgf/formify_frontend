import { Skeleton } from "@/components/ui/skeleton";
import { queryConfig } from "@/config/query.config";
import { AnswerService } from "@/services/answer.service";
import { QuestionService } from "@/services/question.service";
import { IAnswer } from "@/types/answer.types";
import { QuestionType } from "@/types/question.type";
import { useQuery } from "@tanstack/react-query";

interface Props {
  answer: IAnswer;
}

const AnswerCard = ({ answer }: Props) => {
  const questionService = new QuestionService();
  const answerService = new AnswerService();

  const { data: question, isLoading: questionLoading } = useQuery({
    queryKey: [queryConfig.GET_QUESTIONS + "/question/", answer.questionId],
    queryFn: async () => await questionService.getQuestion(answer.questionId),
  });

  const { isLoading: getAnswerOptionsLoading, data: answerOptions } = useQuery({
    queryKey: [queryConfig.CRUD_ANSWER_OPTIONS, answer.id],
    queryFn: async () => await answerService.getAnswerOptions(answer.id),
  });

  return questionLoading || getAnswerOptionsLoading ? (
    <Skeleton className="h-24 w-full" />
  ) : (
    <div className="bg-white rounded-md p-[16px]">
      <div className="flex flex-col gap-[16px]">
        <h3 className="text-center text-[18px]">{question?.title}</h3>
        <p>{question?.description}</p>
        <div className="flex items-center gap-[6px]">
          <span>
            {question?.questionType !== QuestionType.MULTICHOICE
              ? "Answer"
              : "Answers"}
            :
          </span>
          <div>
            {question?.questionType !== QuestionType.MULTICHOICE ? (
              answer.answerValue
            ) : (
              <div className="flex items-center gap-[4px]">
                {answerOptions?.map((item, i) => (
                  <span key={item.id}>
                    {answerOptions.length !== i + 1
                      ? item.option + ","
                      : item.option}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
