import routesConfig from "@/config/routes.config";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminPanelHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70px] max-h-[70px] border-b flex items-center">
      <div className="container mx-auto flex items-center gap-[24px]">
        <div onClick={() => navigate(-1)} className="space-x-4 cursor-pointer">
          <ArrowLeft />
        </div>
        <Link
          to={routesConfig.DASHBOARD}
          className="text-[20px] text-gray hover:text-black font-[500] duration-200"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
