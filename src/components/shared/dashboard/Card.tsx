import routesConfig from "@/config/routes.config";
import { ITemplate } from "@/types/template.types";
import { Link } from "react-router-dom";

interface Props {
  item: ITemplate;
}

const Card = ({ item }: Props) => {
  return (
    <div className="flex flex-col gap-[12px] w-[192px]">
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
      <h5 className="px-[4px]">{item.title}</h5>
    </div>
  );
};

export default Card;
