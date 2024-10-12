import { CirclePlus, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/services/template.service";
import { queryConfig } from "@/config/query.config";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TypeCreateTemplate } from "@/types/template.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import authenticationCheck from "@/utils/authenticationCheck";
import { useLocation, useNavigate } from "react-router-dom";
import routesConfig from "@/config/routes.config";
import useTemplateStore from "@/store/templates.store";

const CreateTemplate = () => {
  const [isVisible, setIsVisible] = useState<string>("");
  const [themeValue, setThemeValue] = useState<string>("");

  const { setTemplates, templates } = useTemplateStore();

  const { register, handleSubmit } = useForm<TypeCreateTemplate>();
  const navigate = useNavigate();
  const location = useLocation();

  const templateService = new TemplateService();
  const { isLoading: isThemesPending, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  const {
    isPending: createPending,
    mutate,
    data: template,
  } = useMutation({
    mutationKey: [queryConfig.CREATE_TEMPLATE],
    mutationFn: async (body: TypeCreateTemplate) =>
      await templateService.create(body),
    onSuccess: (data) => {
      const addTemplate = templates.map((item) => {
        if (item?.theme === data?.theme) {
          item?.data?.push(data!);
          return {
            theme: item?.theme,
            data: item?.data,
          };
        }
      });
      setTemplates(addTemplate);
    },
  });

  const createTemplate: SubmitHandler<TypeCreateTemplate> = async (data) => {
    console.log(authenticationCheck(navigate, location));
    if (authenticationCheck(navigate, location)) {
      mutate({
        ...data,
        isPublic: isVisible.length === 4 ? true : false,
        theme: themeValue,
      });
    }
  };

  useEffect(() => {
    if (template) {
      navigate(routesConfig.TEMPLATE + "/" + template.id);
    }
  }, [navigate, template]);

  return (
    <Dialog>
      <DialogTrigger className="w-[192px] h-[120px] flex items-center justify-center border rounded-md cursor-pointer hover:border hover:border-pink shadow-md overflow-hidden">
        <CirclePlus size={36} className="text-pink" />
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle className="text-[18px] text-center font-[500]">
          Create template
        </DialogTitle>
        {isThemesPending ? (
          <LoaderCircle className="text-blue animate-spin" size={32} />
        ) : (
          <form
            onSubmit={handleSubmit(createTemplate)}
            className="mt-[8px] w-full flex flex-col gap-[16px]"
          >
            <Input
              {...register("title", { required: true })}
              placeholder="Title"
            />
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
                    {theme.slice(0, 1) + theme.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              disabled={createPending}
              type="submit"
              className="w-full bg-pink dark:bg-light dark:text-dark hover:bg-pink/80 duration-200 mt-[16px]"
            >
              Create
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplate;
