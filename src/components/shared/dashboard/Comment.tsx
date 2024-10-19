import { Skeleton } from "@/components/ui/skeleton";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { IComment } from "@/types/comment.types";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface Props {
  comment?: IComment;
}

const Comment = ({ comment }: Props) => {
  const userService = new UserService();
  const { data: author, isLoading: getAuthorLoading } = useQuery({
    queryKey: [queryConfig.GET_USER, comment?.authorId],
    queryFn: async () => await userService.getUser(comment?.authorId),
  });
  return getAuthorLoading ? (
    <Skeleton className="w-full rounded-md h-[32px]" />
  ) : (
    <div className="flex items-start gap-[6px] ">
      <span className="font-[600]">{author?.fullName}</span>
      <div className="flex items-center justify-between w-full">
        <p>{comment?.content}</p>
        <div className="cursor-pointer hover:text-dark text-dark/70 duration-100">
          <Heart size={14} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
