import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryConfig } from "@/config/query.config";
import { CommentSerivce } from "@/services/comment.service";
import useUserStore from "@/store/users.store";
import { IComment, TypeFormComment } from "@/types/comment.types";
import { useMutation } from "@tanstack/react-query";
import { Loader2, SendHorizontal } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import Comment from "./Comment";
import { Dispatch, SetStateAction } from "react";

interface Props {
  templateId: number;
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  getCommentsPending: boolean;
}

const Comments = ({
  templateId,
  comments,
  setComments,
  getCommentsPending,
}: Props) => {
  const { user } = useUserStore();
  const { register, handleSubmit, reset } = useForm<TypeFormComment>();
  const commentService = new CommentSerivce();

  const { mutate: createComment, isPending: createCommentPending } =
    useMutation({
      mutationKey: [queryConfig.CRUD_COMMENTS],
      mutationFn: async (body: TypeFormComment) =>
        commentService.createComment(body),
      onSuccess: (data) => {
        reset();
        if (data) setComments((prev) => (prev ? [...prev, data] : []));
      },
    });

  const onSubmit: SubmitHandler<TypeFormComment> = async (data) => {
    createComment({ content: data.content, authorId: user!.id, templateId });
  };
  return getCommentsPending ? (
    <div className="w-[250px] h-[100] flex items-center justify-center rounded-md bg-white dark:bg-black">
      <Loader2 size={20} className="animate-spin" />
    </div>
  ) : (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-[8px]">
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-[4px] mt-[8px]"
      >
        <Input
          {...register("content", { required: true })}
          placeholder="Write a comment"
          className="p-[16px_8px] h-0"
          disabled={createCommentPending}
        />
        <Button
          disabled={createCommentPending}
          variant={"outline"}
          className="p-0 border-none h-4"
        >
          <SendHorizontal className="text-black" />
        </Button>
      </form>
    </div>
  );
};

export default Comments;
