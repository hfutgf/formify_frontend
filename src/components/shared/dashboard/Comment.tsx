import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { queryConfig } from "@/config/query.config";
import { CommentSerivce } from "@/services/comment.service";
import { UserService } from "@/services/user.service";
import useUserStore from "@/store/users.store";
import { IComment, ICommentLike } from "@/types/comment.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";

interface Props {
  comment?: IComment;
}

const Comment = ({ comment }: Props) => {
  const [likes, setLikes] = useState<ICommentLike[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [like, setLike] = useState<ICommentLike | null>(null);
  const { user } = useUserStore();
  const userService = new UserService();
  const commentService = new CommentSerivce();

  const { data: author, isLoading: getAuthorLoading } = useQuery({
    queryKey: [queryConfig.GET_USER, comment?.authorId],
    queryFn: async () => await userService.getUser(comment?.authorId),
    enabled: !!comment?.authorId,
  });

  const { mutate: createCommentLike, isPending: createCommentLikePending } =
    useMutation({
      mutationKey: [queryConfig.CRUD_COMMENT_LIKES],
      mutationFn: async (body: Omit<ICommentLike, "id">) =>
        await commentService.createCommentLike(body),
      onSuccess: (data) => {
        if (data) {
          setLikes((prev) => [...prev, data]);
          setLike(data);
          setLiked(true);
        }
      },
    });

  useQuery({
    queryKey: [queryConfig.CRUD_COMMENT_LIKES, comment?.id, user?.id],
    queryFn: async () => {
      const data = await commentService.getCheckUserLike(user?.id, comment?.id);
      if (data) {
        setLiked(true);
        setLike(data);
      }
      return data;
    },
    enabled: !!comment?.id && !!user?.id,
  });

  useQuery({
    queryKey: [queryConfig.CRUD_COMMENT_LIKES, comment?.id],
    queryFn: async () => {
      const data = await commentService.getCommentLikes(comment?.id);
      if (data) setLikes(data);
      return data;
    },
    enabled: !!comment?.id,
  });

  const { mutate: deleteCommentLike, isPending: deleteCommentLikePending } =
    useMutation({
      mutationKey: [queryConfig.CRUD_COMMENT_LIKES, like?.id],
      mutationFn: async () => await commentService.deleteCommentLike(like?.id),
      onSuccess: (data) => {
        if (data) {
          setLikes((prev) => prev.filter((item) => item.id !== data.id));
          setLiked(false);
          setLike(null);
        }
      },
    });

  const onComment = async () => {
    if (liked && like) {
      deleteCommentLike();
    } else {
      createCommentLike({
        commentId: comment!.id,
        userId: user!.id,
        value: "LIKE",
      });
    }
  };

  return getAuthorLoading ? (
    <Skeleton className="w-full rounded-md h-[32px]" />
  ) : (
    <div className="flex flex-col gap-[4px]">
      <div className="flex gap-[6px]">
        <span className="font-[600]">{author?.fullName}</span>
        <div className="flex justify-between w-full">
          <p>{comment?.content}</p>
          <Button
            onClick={onComment}
            disabled={createCommentLikePending || deleteCommentLikePending}
            className="cursor-pointer border-none bg-white dark:bg-black p-0 hover:bg-white h-auto hover:text-dark text-dark/70 duration-100"
          >
            <Heart
              size={14}
              stroke={liked ? "red" : "gray"}
              fill={liked ? "red" : "white"}
            />
          </Button>
        </div>
      </div>
      <div className="text-[12px] font-[500] px-[4px]">
        likes {likes.length}
      </div>
    </div>
  );
};

export default Comment;
