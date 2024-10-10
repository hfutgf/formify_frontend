import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IOption } from "@/types/question.type";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { GripVertical, Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
  options: IOption[] | undefined;
  setOptions: Dispatch<SetStateAction<IOption[]>>;
  setText: Dispatch<SetStateAction<string>>;
  clickOption: IOption | null;
  setClickOption: Dispatch<SetStateAction<IOption | null>>;
  onUpdateOption: (e: FormEvent<HTMLFormElement>) => void;
  onOptionAdd: () => void;
  onDeleteOption: () => void;
  deleteOptionPending: boolean;
}

const reorder = (
  list: IOption[],
  startIndex: number,
  endIndex: number
): IOption[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const MultichoiceOptions = ({
  clickOption,
  onOptionAdd,
  onUpdateOption,
  options,
  setClickOption,
  setText,
  deleteOptionPending,
  onDeleteOption,
  setOptions,
}: Props) => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedQuestions = reorder(
      options!,
      result.source.index,
      result.destination.index
    );
    setOptions(reorderedQuestions);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-[8px]"
          >
            {options?.map((option, index) =>
              user?.id === template?.authorId || user?.role === "ADMIN" ? (
                clickOption && clickOption.id === option.id ? (
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
                  <Draggable
                    key={option?.id}
                    draggableId={String(option?.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        key={option.id}
                        onDoubleClick={() => {
                          setClickOption(option);
                        }}
                        className="flex items-center space-x-2"
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical
                            className="opacity-60 hover:opacity-100 duration-200 cursor-move"
                            size={20}
                          />
                        </div>
                        <Checkbox />
                        <span className="cursor-text">{option.text}</span>
                      </div>
                    )}
                  </Draggable>
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
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MultichoiceOptions;
