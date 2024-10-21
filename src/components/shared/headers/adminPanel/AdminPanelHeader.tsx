import routesConfig from "@/config/routes.config";
import { Link } from "react-router-dom";

const AdminPanelHeader = () => {
  return (
    <div className="min-h-[70px] max-h-[70px] border-b flex items-center">
      <div className="container mx-auto">
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
