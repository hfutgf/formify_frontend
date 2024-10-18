import { Button } from "@/components/ui/button";
import routesConfig from "@/config/routes.config";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-[72px] font-[600]">404</h1>
        <p>Page not found</p>
        <Button>
          <Link to={routesConfig.DASHBOARD}>Go dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
