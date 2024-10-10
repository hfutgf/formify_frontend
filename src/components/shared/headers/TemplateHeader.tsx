import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTemplate from "../modals/EditTemplate";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import routesConfig from "@/config/routes.config";

const TemplateHeader = () => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto grid grid-cols-[3fr_6fr_3fr]">
        <div className="flex items-center justify-start">
          <ArrowLeft
            onClick={() => navigate(routesConfig.DASHBOARD)}
            size={28}
            className="cursor-pointer hover:opacity-75 duration-300"
          />
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-end justify-center">
          navs
        </div>
        <div className="flex items-center justify-end space-x-4">
          {user?.id === template?.authorId  || user?.role === "ADMIN" ? <EditTemplate /> : <></>}
          <Button className="bg-primary1 hover:bg-primary1/80 duration-200 w-[30%]">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateHeader;
