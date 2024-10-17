import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTemplate from "../../modals/editTemplateModal/EditTemplateModal";
import useUserStore from "@/store/users.store";
import useTemplateStore from "@/store/templates.store";
import DeleteTemplate from "./DeleteTemplate";
import SendForm from "./SendForm";

const TemplateHeader = () => {
  const { user } = useUserStore();
  const { template } = useTemplateStore();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-black border-b shadow-sm">
      <div className="container mx-auto grid grid-cols-[3fr_6fr_3fr]">
        <div className="flex items-center justify-start">
          <ArrowLeft
            onClick={() => navigate(-1)}
            size={28}
            className="cursor-pointer hover:opacity-75 duration-300"
          />
        </div>
        <div className="min-h-[70px] max-h-[70px] flex items-end justify-center">
          navs
        </div>
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
