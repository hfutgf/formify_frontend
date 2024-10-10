import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IOption } from "@/types/question.type";
import { Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
  options: IOption[] | undefined;
  setText: Dispatch<SetStateAction<string>>;
  clickOption: IOption | null;
  setClickOption: Dispatch<SetStateAction<IOption | null>>;
  onUpdateOption: (e: FormEvent<HTMLFormElement>) => void;
  onOptionAdd: () => void;
  onDeleteOption: () => void;
  deleteOptionPending: boolean;
}

const RadioOption = ({
  options,
  clickOption,
  setClickOption,
  setText,
  onUpdateOption,
  onOptionAdd,
  deleteOptionPending,
  onDeleteOption,
}: Props) => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();

  console.log(clickOption);
  return (
    <RadioGroup className="flex flex-col gap-[16px]">
      {options?.map((option) =>
        user?.id === template?.authorId || user?.role === "ADMIN" ? (
          clickOption?.id === option.id ? (
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
              <Button
                disabled={deleteOptionPending}
                variant={"ghost"}
                className="p-0 h-0"
                onClick={() => {
                  onDeleteOption();
                  setClickOption(null);
                }}
              >
                <Trash2
                  size={20}
                  className="opacity-50 hover:opacity-100 duration-200 cursor-pointer hover:text-red"
                />
              </Button>
            </form>
          ) : (
            <div
              key={option.id}
              onDoubleClick={() => {
                setClickOption(option);
              }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.text} id="option-one" />
                <Label htmlFor="option-one">{option.text}</Label>
              </div>
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
