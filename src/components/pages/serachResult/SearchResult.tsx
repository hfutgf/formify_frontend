import TemplateCards from "@/components/shared/dashboard/TemplateCards";
import useTemplateStore from "@/store/templates.store";
import { useEffect } from "react";
import Loading from "../loading/Loading";

const SearchResult = () => {
  const { serachTempaltes, setSearchTemplates, searchLoading } =
    useTemplateStore();
  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem("searchTemplates")!);
    if (templates) {
      setSearchTemplates(templates);
    }
  }, [setSearchTemplates]);

  if (searchLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto min-h-[calc(100vh-70px)] px-[32px] flex items-center flex-col justify-start gap-[20px]">
      <TemplateCards theme={"Results"} templates={serachTempaltes} />
    </div>
  );
};

export default SearchResult;
