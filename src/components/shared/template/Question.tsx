import { IQuestion } from "@/types/question.type";

interface Props {
  question: IQuestion;
}

const Question = ({ question }: Props) => {
  return (
    <div className="w-[65%] mx-auto bg-white rounded-md p-[12px] flex flex-col ">
      <h4 className="text-center text-[20px] font-[500]">{question.title}</h4>
      <p className="text-[16px] font-[400]">{question.description}</p>
    </div>
  );
};

export default Question;
