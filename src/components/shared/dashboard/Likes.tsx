import { Button } from "@/components/ui/button";
import { queryConfig } from "@/config/query.config";
import { LikeService } from "@/services/like.service";
import useUserStore from "@/store/users.store";
import { ITemplateLike } from "@/types/template.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";

interface Props {
  templateId: number;
}

const Likes = ({ templateId }: Props) => {
  const [likes, setLikes] = useState<ITemplateLike[]>([]);
  const [liked, setLiked] = useState<boolean>();
  const [like, setLike] = useState<ITemplateLike>();
  const { user } = useUserStore();
  const likeService = new LikeService();

  useQuery({
    queryKey: [queryConfig.CRUD_LIKES, templateId, user?.id],
    queryFn: async () => {
      const data = await likeService.getLike(templateId, user?.id);
      if (data) {
        setLiked(true);
        setLike(data);
      }
      return data;
    },
  });

  useQuery({
    queryKey: [queryConfig.CRUD_LIKES, templateId],
    queryFn: async () => {
      const data = await likeService.getLikes(templateId);
      if (data) setLikes(data);
      return data;
    },
  });

  const { mutate: createLike, isPending: createLikePending } = useMutation({
    mutationKey: [queryConfig.CRUD_LIKES],
    mutationFn: async (body: Omit<ITemplateLike, "id">) =>
      await likeService.create(body),
    onSuccess: (data) => {
      if (data) {
        setLikes((prev) => [...prev, data]);
        setLiked(true);
      }
    },
  });

  const { mutate: deleteLike, isPending: deleteLikePending } = useMutation({
    mutationKey: [queryConfig.CRUD_LIKES, like?.id],
    mutationFn: async () => await likeService.delete(like?.id),
    onSuccess: (data) => {
      if (data) {
        setLikes((prev) => prev.filter((item) => item.id !== data.id));
        setLiked(false);
      }
    },
  });

  const onCreateLike = async () => {
    if (liked) {
      deleteLike();
    } else {
      createLike({ templateId, userId: user!.id, value: "LIKE" });
    }
  };

  return (
    <abbr title="Likes" className="no-underline">
      <Button
        disabled={createLikePending || deleteLikePending}
        onClick={onCreateLike}
        variant={"outline"}
        className="flex items-center gap-[4px] text-dark/60 hover:text-dark/80 duration-200 cursor-pointer border-none bg-light"
      >
        <span>{likes.length}</span>
        <Heart
          size={20}
          stroke={liked ? "red" : "gray"}
          fill={liked ? "red" : "white"}
        />
      </Button>
    </abbr>
  );
};

export default Likes;
