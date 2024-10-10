import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IOption } from "@/types/question.type";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
  options: IOption[] | undefined;
  setText: Dispatch<SetStateAction<string>>;
  clickOption: IOption | null;
  setClickOption: Dispatch<SetStateAction<IOption | null>>;
  clickedOptionId: number | undefined;
  setClickedOptionId: Dispatch<SetStateAction<number | undefined>>;
  onUpdateOption: (e: FormEvent<HTMLFormElement>) => void;
  onOptionAdd: () => void;
}

const RadioOption = ({
  options,
  clickOption,
  setClickOption,
  setText,
  clickedOptionId,
  onUpdateOption,
  setClickedOptionId,
  onOptionAdd,
}: Props) => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();
  return (
    <RadioGroup className="flex flex-col gap-[12px]">
      {options?.map((option) =>
        user?.id === template?.authorId || user?.role === "ADMIN" ? (
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
      {user?.id === template?.authorId || user?.role === "ADMIN" ? (
        <div
          onClick={onOptionAdd}
          className="flex items-end gap-[12px] opacity-60 cursor-text"
        >
          <div className="w-[16px] border rounded-full p-2" />
          <div className="w-[50%] border-b" />
        </div>
      ) : (
        <></>
      )}
    </RadioGroup>
  );
};

export default RadioOption;
