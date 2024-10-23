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
import { queryConfig } from "@/config/query.config";
import routesConfig from "@/config/routes.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { TypeCreateTemplate } from "@/types/template.types";
import authenticationCheck from "@/utils/authenticationCheck";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const CreateTemplateForm = ({ themes }: { themes: string[] | undefined }) => {
  const [isVisible, setIsVisible] = useState<string>("");
  const [themeValue, setThemeValue] = useState<string>("");
  const { setTemplates, templates, setTemplate } = useTemplateStore();
  const { register, handleSubmit } = useForm<TypeCreateTemplate>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const templateService = new TemplateService();

  const { isPending: createPending, mutate } = useMutation({
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
      if (data) {
        setTemplate(data);
        navigate(routesConfig.TEMPLATE + "/" + data?.id);
      }
    },
  });

  const sortedTheme = useMemo(() => themes?.sort(), [themes]);

  const createTemplate: SubmitHandler<TypeCreateTemplate> = async (data) => {
    if (authenticationCheck(navigate, location)) {
      mutate({
        ...data,
        isPublic: isVisible.length === 4 ? true : false,
        theme: themeValue,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(createTemplate)}
      className="mt-[8px] w-full flex flex-col gap-[16px]"
    >
      <Input
        {...register("title", { required: true })}
        placeholder={t("title")}
      />
      <Select
        value={themeValue}
        required={true}
        onValueChange={(value) => setThemeValue(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("theme")} />
        </SelectTrigger>
        <SelectContent>
          {sortedTheme?.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme.slice(0, 1) + theme.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <RadioGroup
        value={isVisible}
        onValueChange={(value) => setIsVisible(value)}
        required={true}
        defaultValue="option-one"
        className="flex items-center gap-[24px] px-[12px]"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="option-one" />
          <Label htmlFor="option-one">{t("public")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="option-two" />
          <Label htmlFor="option-two">{t("private")}</Label>
        </div>
      </RadioGroup>
      <Button
        disabled={createPending}
        type="submit"
        className="w-full bg-pink dark:bg-light dark:text-dark hover:bg-pink/80 duration-200 mt-[16px]"
      >
        {t("create")}
      </Button>
    </form>
  );
};

export default CreateTemplateForm;
