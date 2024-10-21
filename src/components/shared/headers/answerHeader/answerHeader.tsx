import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const AnswerHeader = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const userService = new UserService();

  const { data: author } = useQuery({
    queryKey: [queryConfig.GET_USER, authorId],
    queryFn: async () => await userService.getUser(Number(authorId)),
    enabled: !!authorId,
  });
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
        <div className="flex items-center justify-center">
          <Link
            to={"/profile"}
            className="flex text-[18px] font-[500] hover:opacity-80 duration-300"
          >
            {author?.fullName}
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AnswerHeader;
