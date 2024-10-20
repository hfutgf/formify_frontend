import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import routesConfig from "@/config/routes.config";
import { ITemplate } from "@/types/template.types";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { useState } from "react";
import { IComment } from "@/types/comment.types";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { CommentSerivce } from "@/services/comment.service";
import Likes from "./Likes";

interface Props {
  item: ITemplate;
}

const TemplateCard = ({ item }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const commentService = new CommentSerivce();

  const { isLoading: getCommentsPending } = useQuery({
    queryKey: [queryConfig.CRUD_COMMENTS, item.id],
    queryFn: async () => {
      const data = await commentService.getComments(item.id);
      if (data) setComments(data);
      return data;
    },
  });

  return (
    <div className="flex flex-col w-[192px]">
      <Link
        className="border rounded-md cursor-pointer hover:border hover:border-pink shadow-md overflow-hidden"
        to={routesConfig.TEMPLATE + "/" + item.id}
      >
        <img
          src={item.imageUrl}
          alt="template-img"
          className="w-[190px] h-[120px]"
          width={190}
          height={120}
        />
      </Link>
      <h5 className="px-[4px] my-[6px]">
        {item.title.length > 16 ? item.title.slice(0, 16) : item.title}
      </h5>
      <div className="flex items-center w-full justify-end select-none">
        <Popover>
          <PopoverTrigger>
            <abbr title="Comments" className="no-underline">
              <div className="flex items-center gap-[4px] text-dark/60 hover:text-dark/80 duration-200 cursor-pointer">
                <span>{comments.length}</span>
                <MessageCircle size={18} />
              </div>
            </abbr>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] max-h-[300px] overflow-y-scroll">
            <Comments
              comments={comments}
              setComments={setComments}
              templateId={item.id}
              getCommentsPending={getCommentsPending}
            />
          </PopoverContent>
        </Popover>
        <Likes templateId={item.id} />
      </div>
    </div>
  );
};

export default TemplateCard;
