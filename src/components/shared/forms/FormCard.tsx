import { queryConfig } from "@/config/query.config";
import routesConfig from "@/config/routes.config";
import { UserService } from "@/services/user.service";
import { IForm } from "@/types/answer.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  form: IForm;
}

const FormCard = ({ form }: Props) => {
  const userService = new UserService();

  const { isLoading: getUserIsLoading, data: user } = useQuery({
    queryKey: [queryConfig.GET_USER, form.authorId],
    queryFn: async () => await userService.getUser(form.authorId),
    enabled: !!form.authorId,
  });

  return getUserIsLoading ? (
    <div className="w-[100px] h-[70px] flex items-center justify-center bg-white dark:bg-black rounded-md">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <Link
      to={routesConfig.ANSWERS + "/forms/" + form.id + "/" + user?.id}
      className="border p-[16px] rounded-md flex flex-col items-center cursor-pointer bg-white shadow-sm hover:bg-light dark:bg-black dark:hover:bg-dark duration-300 overflow-hidden"
    >
      <span>
        {user && user?.fullName!.length > 16
          ? user?.fullName?.slice(0, 15)
          : user?.fullName}
      </span>
      <div className="flex items-center flex-col">
        <span>{format(form.submittedAt, "dd.MM.yyyy")}</span>
        <span> {format(form.submittedAt, "HH:mm:ss")}</span>
      </div>
    </Link>
  );
};

export default FormCard;
