import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const AnswerHeader = () => {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default AnswerHeader;
