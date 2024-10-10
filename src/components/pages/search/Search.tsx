import TemplateCards from "@/components/shared/dashboard/TemplateCards";
import useTemplateStore from "@/store/templates.store";
import { useEffect } from "react";

const Search = () => {
  const { serachTempaltes, setSearchTemplates } = useTemplateStore();
  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem("searchTemplates")!);
    if (templates) {
      setSearchTemplates(templates);
    }
  }, [setSearchTemplates]);
  return (
    <div className="container mx-auto min-h-screen px-[32px] flex items-center flex-col justify-start gap-[20px]">
      <TemplateCards theme={"Results"} templates={serachTempaltes} />
    </div>
  );
};

export default Search;
