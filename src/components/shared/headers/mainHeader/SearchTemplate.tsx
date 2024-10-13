import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryConfig } from "@/config/query.config";
import routesConfig from "@/config/routes.config";
import { TemplateService } from "@/services/template.service";
import useTemplateStore from "@/store/templates.store";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchTemplate = () => {
  const [title, setTitle] = useState("");
  const [enabledSearchTemplates, setEnabledSearchTemplates] = useState(false);
  const navigate = useNavigate();

  const { setSearchTemplates } = useTemplateStore();
  const templateService = new TemplateService();

  const { isLoading: searchTempalteLoading } = useQuery({
    queryKey: [queryConfig.SEARCH_TEMPLATE],
    queryFn: async () => {
      const data = await templateService.searchTemplate(title);
      if (data) {
        setSearchTemplates(data);
        setEnabledSearchTemplates(false);
        localStorage.setItem("searchTemplates", JSON.stringify(data));
      }
    },
    enabled: enabledSearchTemplates && !!title,
  });

  const onSearchTempaltes = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(routesConfig.SEARCH);
    setEnabledSearchTemplates(true);
  };
  return (
    <div className="min-h-[70px] max-h-[70px] flex items-center">
      <form
        onSubmit={onSearchTempaltes}
        className="border flex items-center w-full rounded-md"
      >
        <Input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search template"
          className="border-none"
        />
        <Button
          disabled={searchTempalteLoading}
          variant={"ghost"}
          type="submit"
          className="rounded-tl-none rounded-bl-none"
        >
          <Search size={24} />
        </Button>
      </form>
    </div>
  );
};

export default SearchTemplate;
