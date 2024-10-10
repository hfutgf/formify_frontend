import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IOption, IQuestion, QuestionType } from "@/types/question.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  question: IQuestion | undefined;
}
const Options = ({ question }: Props) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [clickOption, setClickOption] = useState<IOption | null>(null);
  const [clickedOptionId, setClickedOptionId] = useState<number>();
  const [text, setText] = useState("");

  const { user } = useUserStore();
  const { template } = useTemplateStore();

  const questionService = new QuestionService();
  const { data: getOptions } = useQuery({
    queryKey: [queryConfig.GET_OPTIONS, question?.id],
    queryFn: async () => await questionService.getOptions(question?.id),
  });

  useEffect(() => {
    if (getOptions) setOptions(getOptions);
  }, [getOptions, setOptions]);

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
      setOptions((prev) => [
        ...prev.filter((item) => item.id !== data.id),
        data,
      ]);
    },
  });

  const onOptionAdd = () => {
    createOption();
  };

  const onUpdateOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOption({ text });
    setClickOption(null);
  };

  return (
    <div className="mt-[16px">
      {question?.questionType === QuestionType.TEXT ? (
        <Input placeholder="Answer" />
      ) : question?.questionType === QuestionType.RADIO ? (
        <RadioGroup className="flex flex-col gap-[12px]">
          {options?.map((option) =>
            user?.id === template?.authorId ? (
              clickOption && clickedOptionId === option.id ? (
                <form
                  key={option.id}
                  onSubmit={onUpdateOption}
                  className="flex items-center gap-[12px]"
                >
                  <Input
                    onChange={(e) => setText(e.target.value)}
                    required
                    defaultValue={option.text}
                  />
                  <Button
                    type="submit"
                    className="bg-primary1 hover:bg-primary1/80 duration-200 text-white"
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => setClickOption(null)}
                    variant={"destructive"}
                    type="button"
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div
                  key={option.id}
                  onDoubleClick={() => {
                    setClickOption(option);
                    setClickedOptionId(option.id);
                  }}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={option.text} id="option-one" />
                  <Label htmlFor="option-one">{option.text}</Label>
                </div>
              )
            ) : (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.text} id="option-one" />
                <Label htmlFor="option-one">{option.text}</Label>
              </div>
            )
          )}
          <div
            onClick={onOptionAdd}
            className="flex items-end gap-[12px] opacity-60  cursor-text"
          >
            <div className="w-[16px] border rounded-full p-2" />
            <div className="w-[50%] border-b" />
          </div>
        </RadioGroup>
      ) : (
        <div className="flex flex-col gap-[8px]">
          {options?.map((option) =>
            user?.id === template?.authorId ? (
              clickOption && clickedOptionId === option.id ? (
                <form
                  key={option.id}
                  onSubmit={onUpdateOption}
                  className="flex items-center gap-[12px]"
                >
                  <Input
                    onChange={(e) => setText(e.target.value)}
                    required
                    defaultValue={option.text}
                  />
                  <Button
                    type="submit"
                    className="bg-primary1 hover:bg-primary1/80 duration-200 text-white"
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => setClickOption(null)}
                    variant={"destructive"}
                    type="button"
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div
                  key={option.id}
                  onDoubleClick={() => {
                    setClickOption(option);
                    setClickedOptionId(option.id);
                  }}
                  className="flex items-center space-x-2"
                >
                  <Checkbox />
                  <span>{option.text}</span>
                </div>
              )
            ) : (
              <div key={option.id} className="flex items-center gap-[8px]">
                <Checkbox />
                <span>{option.text}</span>
              </div>
            )
          )}

          <div
            onClick={onOptionAdd}
            className="flex items-end gap-[12px] opacity-60  cursor-text"
          >
            <div className="w-[16px] border rounded-[5px] p-2" />
            <div className="w-[50%] border-b" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
