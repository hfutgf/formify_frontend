import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { queryConfig } from "@/config/query.config";
import { cn } from "@/lib/utils";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { TypeUpdateTemplate } from "@/types/template.types";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EditTemplateForm = ({
  themes,
  setOpenModal,
}: {
  themes: string[] | undefined;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setTemplate, template } = useTemplateStore();
  const [isVisible, setIsVisible] = useState<string>(`${template?.isPublic}`);
  const [themeValue, setThemeValue] = useState<string | undefined>(
    template?.theme
  );

  const { register, handleSubmit } = useForm<
    TypeUpdateTemplate & { file: FileList }
  >();

  const templateService = new TemplateService();

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: [queryConfig.CURD_TEMPLATES, template?.id],
    mutationFn: async (body: FormData) =>
      await templateService.update(template?.id, body),
    onSuccess: (data) => {
      if (data) {
        setTemplate(data);
        setOpenModal(false);
      }
    },
  });
  const { mutate: removeImage, isPending: removeImagePending } = useMutation({
    mutationKey: [queryConfig.REMOVE_TEMPLATE_IMG, template?.id],
    mutationFn: async () => await templateService.removeImage(template?.id),
    onSuccess: (data) => {
      setTemplate(data);
    },
  });
  const updateTemplate: SubmitHandler<
    TypeUpdateTemplate & { file: FileList }
  > = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description!);
    formData.append("theme", themeValue!);
    formData.append("isPublic", isVisible);
    if (data.file) formData.append("file", data.file[0]);
    update(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(updateTemplate)}
      className=" w-full flex flex-col gap-[16px]"
    >
      <Input
        defaultValue={template?.title}
        {...register("title", { required: true })}
        placeholder="Title"
        required={true}
      />
      <Textarea
        required={true}
        defaultValue={template?.description}
        {...register("description", { required: true })}
        placeholder="Description"
      />
      <Select
        value={themeValue}
        required={true}
        onValueChange={(value) => setThemeValue(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes?.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme.slice(0, 1) + theme.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {template?.imageUrl ? (
        <div className="flex items-center gap-2">
          <img
            src={template.imageUrl}
            alt="template-img"
            className="w-[200px] h-[100px] rounded-md"
          />
          <Trash2
            onClick={() => removeImage()}
            className={cn(
              "text-red hover:text-red/70 duration-200 cursor-pointer",
              removeImagePending ? "text-red/70" : ""
            )}
            size={24}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-start">
          <Input
            required={true}
            {...register("file", {
              required: true,
            })}
            type="file"
            name="file"
            id="template-image"
            className="cursor-pointer w-auto"
          />
        </div>
      )}
      <RadioGroup
        value={isVisible}
        onValueChange={(value) => setIsVisible(value)}
        required
        defaultValue="option-one"
        className="flex items-center gap-[24px] px-[12px]"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="option-one" />
          <Label htmlFor="option-one">Public</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="option-two" />
          <Label htmlFor="option-two">Private</Label>
        </div>
      </RadioGroup>
      <Button
        disabled={updatePending}
        type="submit"
        className="w-full bg-primary1 dark:bg-light dark:text-dark hover:bg-primary1/80 duration-200 mt-[16px]"
      >
        Update
      </Button>
    </form>
  );
};

export default EditTemplateForm;
