import Cards from "@/components/shared/dashboard/Cards";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading/Loading";
import CreateTemplate from "../../modals/CreateTemplate";

const Dashboard = () => {
  const templateService = new TemplateService();

  const { isPending, data } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATES],
    queryFn: async () => await templateService.getAll(),
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto min-h-screen px-[32px] flex items-center flex-col justify-center gap-[28px]">
      <div className="w-full p-[24px]">
        <h4 className="text-[18px] font-[500] text-start text-dark">Create</h4>
        <div className="mt-[20px] flex items-center flex-wrap gap-[16px]">
          <div className="flex flex-col gap-[12px] w-[192px]">
            <CreateTemplate />
          </div>
        </div>
      </div>
      {data?.map((item) => (
        <Cards key={item.theme} theme="Test" templates={item.data} />
      ))}
    </div>
  );
};

export default Dashboard;
