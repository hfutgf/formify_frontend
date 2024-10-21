import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import { IOption, IQuestion, QuestionType } from "@/types/question.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import RadioOption from "./RadioOptions";
import MultichoiceOptions from "./MultichoiceOptions";
import TextOptions from "./TextOptions";

interface Props {
  question: IQuestion | undefined;
}
const Options = ({ question }: Props) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [clickOption, setClickOption] = useState<IOption | null>(null);
  const [text, setText] = useState("");

  const questionService = new QuestionService();
  useQuery({
    queryKey: [queryConfig.GET_OPTIONS, question?.id],
    queryFn: async () => {
      if (question) {
        const data = await questionService.getOptions(question?.id);
        if (data) setOptions(data);
        return data;
      }
      return null;
    },
    enabled: !!question?.id,
  });

  const { mutate: createOption } = useMutation({
    mutationKey: [queryConfig.CREATE_OPTION, question?.id],
    mutationFn: async () => await questionService.createOption(question!.id),
    onSuccess: (data) => {
      setOptions((prev) => [...prev, data!]);
    },
  });

  const { mutate: updateOption } = useMutation({
    mutationKey: [queryConfig.UPDATE_OPTION, clickOption?.id],
    mutationFn: async (body: { text: string }) =>
      await questionService.updateOption(clickOption?.id, body),
    onSuccess: (data) => {
      setOptions((prev) =>
        [...prev.filter((item) => item.id !== data.id), data].sort(
          (a, b) => a.order - b.order
        )
      );
      setClickOption(null);
    },
  });

  const { mutate: deleteOption, isPending: deleteOptionPending } = useMutation({
    mutationKey: [queryConfig.DELETE_OPTION, clickOption?.id],
    mutationFn: async () => await questionService.deleteOption(clickOption?.id),
    onSuccess: (data) => {
      setOptions((prev) => [...prev.filter((item) => item.id !== data.id)]);
    },
  });

  const onOptionAdd = () => {
    createOption();
  };

  const onUpdateOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOption({ text });
  };

  const onDeleteOption = () => {
    deleteOption();
  };

  return (
    <div className="mt-[16px">
      {question?.questionType === QuestionType.TEXT ? (
        <TextOptions question={question} />
      ) : question?.questionType === QuestionType.RADIO ? (
        <RadioOption
          options={options}
          setOptions={setOptions}
          setText={setText}
          clickOption={clickOption}
          onOptionAdd={onOptionAdd}
          onUpdateOption={onUpdateOption}
          setClickOption={setClickOption}
          deleteOptionPending={deleteOptionPending}
          onDeleteOption={onDeleteOption}
          question={question}
        />
      ) : (
        <MultichoiceOptions
          options={options}
          setOptions={setOptions}
          setText={setText}
          clickOption={clickOption}
          onOptionAdd={onOptionAdd}
          onUpdateOption={onUpdateOption}
          setClickOption={setClickOption}
          deleteOptionPending={deleteOptionPending}
          onDeleteOption={onDeleteOption}
          question={question}
        />
      )}
    </div>
  );
};

export default Options;
