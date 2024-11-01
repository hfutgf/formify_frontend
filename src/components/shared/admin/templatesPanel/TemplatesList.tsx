import { ITemplate } from "@/types/template.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/pages/loading/Loading";
import { Link } from "react-router-dom";
import routesConfig from "@/config/routes.config";
import DeleteTemplate from "../../headers/templateHeader/DeleteTemplate";

interface Props {
  templates: ITemplate[];
  getByThemeLoading: boolean;
  getTemplateLoading: boolean;
}

const TemplatesList = ({
  getByThemeLoading,
  getTemplateLoading,
  templates,
}: Props) => {
  if (getByThemeLoading || getTemplateLoading) {
    return <Loading />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates?.map((template) => (
          <TableRow
            key={template.id}
            className="flex justify-between items-center"
          >
            <TableCell className="hover:underline duration-200">
              <Link to={routesConfig.TEMPLATE + "/" + template.id}>
                {template.title}
              </Link>
            </TableCell>
            <TableCell className="cursor-pointer">
              <DeleteTemplate />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TemplatesList;
