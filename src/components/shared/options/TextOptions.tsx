import { Input } from "@/components/ui/input";
import useAnswersStore from "@/store/answers.store";
import { IQuestion } from "@/types/question.type";

interface Props {
  question: IQuestion;
}

const TextOptions = ({ question }: Props) => {
  const { setAnswer } = useAnswersStore();

  return (
    <Input
      onChange={(e) =>
        setAnswer({
          formId: 0,
          questionId: question.id,
          answerValue: e.target.value,
        })
      }
      placeholder="Answer"
    />
  );
};

export default TextOptions;
