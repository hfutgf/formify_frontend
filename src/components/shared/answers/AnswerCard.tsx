import { Skeleton } from "@/components/ui/skeleton";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import { IAnswer } from "@/types/answer.types";
import { QuestionType } from "@/types/question.type";
import { useQuery } from "@tanstack/react-query";

interface Props {
  answer: IAnswer;
}

const AnswerCard = ({ answer }: Props) => {
  const questionService = new QuestionService();

  const { data: question, isLoading: questionLoading } = useQuery({
    queryKey: [queryConfig.GET_QUESTIONS + "/question/", answer.questionId],
    queryFn: async () => await questionService.getQuestion(answer.questionId),
  });

  return questionLoading ? (
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
          <span>{answer.answerValue}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
