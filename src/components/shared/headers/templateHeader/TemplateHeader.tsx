import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EditTemplate from "../../modals/editTemplateModal/EditTemplateModal";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import DeleteTemplate from "./DeleteTemplate";
import SendForm from "./SendForm";
import { cn } from "@/lib/utils";
import routesConfig from "@/config/routes.config";

const TemplateHeader = () => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();

  const navigate = useNavigate();
  const location = useLocation();
  const { templateId } = useParams();

  return (
    <div className="bg-white min-h-[70px] max-h-[70px] flex items-center dark:bg-black border-b shadow-sm">
      <div className={cn("container mx-auto grid grid-cols-[3fr_6fr_3fr]")}>
        <div className="flex items-center justify-start">
          <ArrowLeft
            onClick={() => navigate(-1)}
            size={28}
            className="cursor-pointer hover:opacity-75 duration-300"
          />
        </div>
        {user?.id === template?.authorId || user?.role === "ADMIN" ? (
          <div className="flex items-end justify-center gap-[24px]">
            <Link
              to={routesConfig.TEMPLATE + "/" + templateId}
              className={cn(
                !location.pathname.includes("forms") ? "underline" : ""
              )}
            >
              Questions
            </Link>
            <Link
              to={routesConfig.TEMPLATE + "/forms/" + templateId}
              className={cn(
                location.pathname.includes("forms") ? "underline" : ""
              )}
            >
              Answers
            </Link>
          </div>
        ) : (
          <div className="flex items-end justify-center">Questions</div>
        )}

        <div className="flex items-center justify-end space-x-4">
          {user?.id === template?.authorId || user?.role === "ADMIN" ? (
            <div className="flex items-center space-x-4">
              <EditTemplate />
              <DeleteTemplate />
            </div>
          ) : (
            <></>
          )}
          <SendForm />
        </div>
      </div>
    </div>
  );
};

export default TemplateHeader;
