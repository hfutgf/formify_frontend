import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { IQuestion, QuestionType } from "@/types/question.type";

interface Props {
  question: IQuestion;
}

const Question = ({ question }: Props) => {
  return (
    <div className="w-[65%] mx-auto bg-white rounded-md p-[12px] flex flex-col gap-[12px]">
      <h4 className="text-center text-[20px] font-[500]">{question.title}</h4>
      <p className="text-[16px] font-[400]">{question.description}</p>
      {question.questionType === QuestionType.TEXT ? (
        <Input className="" placeholder="Answer" />
      ) : question.questionType === QuestionType.RADIO ? (
        <div>Radio group</div>
      ) : (
        <div>
          <Checkbox />
        </div>
      )}
    </div>
  );
};

export default Question;
