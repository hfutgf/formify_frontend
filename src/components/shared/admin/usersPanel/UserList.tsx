import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/user.types";
import { Pencil } from "lucide-react";
import EditUser from "./EditUser";
import { Dispatch, SetStateAction } from "react";
import DeleteUser from "./DeleteUser";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routesConfig from "@/config/routes.config";
import Loading from "@/components/pages/loading/Loading";

interface Props {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  getUsersLoading: boolean;
  getUsersByRoleLoading: boolean;
}

const UserList = ({
  users,
  getUsersLoading,
  getUsersByRoleLoading,
  setUsers,
}: Props) => {
  const { t } = useTranslation();
  if (getUsersLoading || getUsersByRoleLoading) {
    return <Loading />;
  }

  return (
    <Table className="mt-[32px]">
      <TableHeader>
        <TableRow className="grid grid-cols-[1fr_3.5fr_3.5fr_1fr_1fr_2fr]">
          <TableHead>№</TableHead>
          <TableHead>{t("email")}</TableHead>
          <TableHead>{t("full-name")}</TableHead>
          <TableHead>{t("role")}</TableHead>
          <TableHead>{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          ?.sort((a: IUser, b: IUser) =>
            (a.fullName ?? "").localeCompare(b.fullName ?? "")
          )
          .map((user, i) => (
            <TableRow
              key={user.id}
              className="grid grid-cols-[1fr_3.5fr_3.5fr_1fr_1fr_2fr]"
            >
              <TableCell>{i + 1}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="hover:underline duration-200">
                <Link to={routesConfig.PERSONAL + `/${user.id}`}>
                  {user.fullName}
                </Link>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell className="cursor-pointer flex justify-end gap-[8px]">
                <Popover>
                  <PopoverTrigger className="border rounded-md p-2 hover:bg-white">
                    <Pencil size={20} />
                  </PopoverTrigger>
                  <EditUser users={users} setUsers={setUsers} user={user} />
                </Popover>
                <DeleteUser setUsers={setUsers} user={user} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
