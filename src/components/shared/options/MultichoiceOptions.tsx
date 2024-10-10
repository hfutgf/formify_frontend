import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

const MultichoiceOptions = ({
  clickOption,
  clickedOptionId,
  onOptionAdd,
  onUpdateOption,
  options,
  setClickOption,
  setClickedOptionId,
  setText,
}: Props) => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();
  return (
    <div className="flex flex-col gap-[8px]">
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
      {user?.id === template?.authorId || user?.role === "ADMIN" ? (
        <div
          onClick={onOptionAdd}
          className="flex items-end gap-[12px] opacity-60  cursor-text"
        >
          <div className="w-[16px] border rounded-[5px] p-2" />
          <div className="w-[50%] border-b" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MultichoiceOptions;
