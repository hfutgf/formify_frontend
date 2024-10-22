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
import { Loader, Pencil } from "lucide-react";
import EditUser from "./EditUser";
import { Dispatch, SetStateAction } from "react";
import DeleteUser from "./DeleteUser";

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
  if (getUsersLoading || getUsersByRoleLoading) {
    return (
      <div className="flex items-center justify-center mt-[144px]">
        <Loader size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <Table className="mt-[32px]">
      <TableHeader>
        <TableRow className="grid grid-cols-[1fr_3.5fr_3.5fr_1fr_1fr_2fr]">
          <TableHead>№</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
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
              <TableCell>{user.fullName}</TableCell>
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
