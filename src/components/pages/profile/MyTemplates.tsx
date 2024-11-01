import DeleteTemplate from "@/components/shared/headers/templateHeader/DeleteTemplate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { queryConfig } from "@/config/query.config";
import routesConfig from "@/config/routes.config";
import { TemplateService } from "@/services/template.service";
import useUserStore from "@/store/users.store";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

const MyTemplates = () => {
  const { user } = useUserStore();

  const templateService = new TemplateService();

  const { data: templates, isLoading: getTemplatesPending } = useQuery({
    queryKey: [queryConfig.CURD_TEMPLATES, user?.id],
    queryFn: async () => await templateService.getTemplates(user?.id),
    enabled: !!user?.id,
  });

  return getTemplatesPending ? (
    <Loading />
  ) : (
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

export default MyTemplates;
