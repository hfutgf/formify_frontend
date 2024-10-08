import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { TemplateService } from "@/services/template.service";
import { ITemplate, TypeUpdateTemplate } from "@/types/template.types";
import { useQuery } from "@tanstack/react-query";
import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  template: ITemplate | null;
}

const EditTemplate = ({ template }: Props) => {
  const [isVisible, setIsVisible] = useState<string>(`${template?.isPublic}`);
  const [themeValue, setThemeValue] = useState<string | undefined>(
    template?.theme
  );

  const { register, handleSubmit } = useForm<TypeUpdateTemplate>();

  const templateService = new TemplateService();
  const { isLoading: isThemesPending, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  const updateTemplate = async () => {};
  return (
    <Dialog>
      <DialogTrigger className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ">
        Edit
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-[16px]">Change your template</DialogTitle>
          {isThemesPending ? (
            <LoaderCircle className="text-blue animate-spin" size={32} />
          ) : (
            <form
              onSubmit={handleSubmit(updateTemplate)}
              className=" w-full flex flex-col gap-[16px]"
            >
              <Input
                value={template?.title}
                {...register("title", { required: true })}
                placeholder="Title"
              />
              <Textarea placeholder="Description" />
              <Select
                value={themeValue}
                required
                onValueChange={(value) => setThemeValue(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes?.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {template?.imageUrl ? (
                <div>
                  <img
                    src={template.imageUrl}
                    alt=""
                    className="w-[100px] h-[50px] rounded-md"
                  />
                </div>
              ) : (
                <div className="w-full flex items-center justify-start">
                  <label
                    htmlFor="template-image"
                    className="flex items-center gap-[8px] border p-[8px_12px] cursor-pointer rounded-md hover:bg-light duration-200"
                  >
                    <Download size={20} />
                    <span>Select image</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="template-image"
                    className="hidden"
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
                // disabled={updatePending}
                type="submit"
                className="w-full bg-primary1 dark:bg-light dark:text-dark hover:bg-primary1/80 duration-200 mt-[16px]"
              >
                Create
              </Button>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTemplate;
