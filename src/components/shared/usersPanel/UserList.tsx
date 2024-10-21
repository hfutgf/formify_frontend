import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/user.types";
import { Loader } from "lucide-react";

interface Props {
  users: IUser[];
  getUsersLoading: boolean;
  getUsersByRoleLoading: boolean;
}

const UserList = ({ users, getUsersLoading, getUsersByRoleLoading }: Props) => {
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
        <TableRow className="grid grid-cols-[1fr_3.5fr_3.5fr_2fr_2fr]">
          <TableHead>№</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, i) => (
          <TableRow
            key={user.id}
            className="grid grid-cols-[1fr_3.5fr_3.5fr_2fr_2fr]"
          >
            <TableCell>{i + 1}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="cursor-pointer flex justify-end">
              <Button variant={"outline"}>Profile</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
