import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { queryConfig } from "@/config/query.config";
import { QuestionService } from "@/services/question.service";
import useAnswersStore from "@/store/answers.store";
import useTemplateStore from "@/store/templates.store";
import useUserStore from "@/store/users.store";
import { IOption, IQuestion } from "@/types/question.type";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
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
  question?: IQuestion;
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

const RadioOption = ({
  options,
  clickOption,
  setClickOption,
  setText,
  onUpdateOption,
  onOptionAdd,
  deleteOptionPending,
  onDeleteOption,
  setOptions,
  question,
}: Props) => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();
  const { setAnswer } = useAnswersStore();

  const questionService = new QuestionService();

  const { mutate } = useMutation({
    mutationKey: [queryConfig.UPDATE_OPTIONS_ORDER],
    mutationFn: async (ids: number[]) =>
      await questionService.updateOptionsOrder(ids, question?.id),
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedQuestions = reorder(
      options!,
      result.source.index,
      result.destination.index
    );
    mutate(reorderedQuestions.map((item) => item.id));
    setOptions(reorderedQuestions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <RadioGroup
            onValueChange={(value) =>
              setAnswer({
                formId: 0,
                questionId: question!.id,
                answerValue: value,
              })
            }
            required={true}
          >
            <div
              className="flex flex-col gap-[16px]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {options?.map((option, index) =>
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
                    <Draggable
                      key={option?.id}
                      draggableId={String(option?.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <div {...provided.dragHandleProps}>
                              <GripVertical
                                className="opacity-60 hover:opacity-100 duration-200 cursor-move"
                                size={20}
                              />
                            </div>
                            <RadioGroupItem
                              value={option.text}
                              id={String(option.id)}
                            />
                            <div
                              className="cursor-text w-full h-4"
                              onDoubleClick={() => {
                                setClickOption(option);
                              }}
                            >
                              <Label htmlFor={String(option.id)}>
                                {option.text}
                              </Label>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                ) : (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.text}
                      id={String(option.id)}
                    />
                    <Label htmlFor={String(option.id)}>{option.text}</Label>
                  </div>
                )
              )}
            </div>
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
            {provided.placeholder}
          </RadioGroup>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RadioOption;
