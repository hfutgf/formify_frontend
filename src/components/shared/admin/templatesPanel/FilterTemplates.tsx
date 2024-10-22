import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import { IGetTemplates } from "@/types/template.types";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setTemplates: Dispatch<SetStateAction<IGetTemplates[]>>;
  setGetByThemeLoading: Dispatch<SetStateAction<boolean>>;
}

const FilterTemplates = ({ setTemplates, setGetByThemeLoading }: Props) => {
  const [theme, setTheme] = useState<string>(() => {
    const data = JSON.parse(localStorage.getItem("themeValue")!);
    if (data) {
      return data;
    } else {
      return "ALL";
    }
  });
  const templateService = new TemplateService();

  const {
    isLoading: getTempaltesByThemeLoading,
    refetch: refetchGetTemplatesByTheme,
  } = useQuery({
    queryKey: ["/theme" + queryConfig.GET_TEMPLATES, theme],
    queryFn: async () => {
      const data = await templateService.getTemplatesByTheme(theme);
      if (data) setTemplates(data);
      return data;
    },
    enabled: !!theme,
  });

  const { isLoading: getThemeLoading, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  useEffect(() => {
    refetchGetTemplatesByTheme();
  }, [refetchGetTemplatesByTheme, theme]);

  useEffect(() => {
    setGetByThemeLoading(getTempaltesByThemeLoading);
  }, [getTempaltesByThemeLoading, setGetByThemeLoading]);

  return (
    <div>
      <Select
        disabled={getThemeLoading}
        onValueChange={(value) => {
          setTheme(value);
          localStorage.setItem("themeValue", JSON.stringify(value));
        }}
        value={theme}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          {themes?.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme[0] + theme.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterTemplates;
