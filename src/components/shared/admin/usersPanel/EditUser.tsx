import { PopoverContent } from "@/components/ui/popover";
import { IUser } from "@/types/user.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/store/users.store";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { Dispatch, SetStateAction } from "react";

interface Props {
  user: IUser;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}
const EditUser = ({ user, setUsers }: Props) => {
  const { user: admin } = useUserStore();
  const userService = new UserService();

  const { mutate: updateUser } = useMutation({
    mutationKey: [queryConfig.CRUD_USERS, admin?.id, user.id],
    mutationFn: async (body: { role?: string; status?: string }) =>
      await userService.updateUserFromAdmin(body, admin?.id, user?.id),
    onSuccess: (data) => {
      if (data)
        setUsers((prev) => [
          ...prev.filter((item) => item.id !== data.id),
          data,
        ]);
      return data;
    },
  });

  return (
    <PopoverContent className="flex flex-col gap-[12px] justify-center items-center">
      <div>
        <Select
          onValueChange={(value) => updateUser({ role: value })}
          defaultValue={user.role}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          onValueChange={(value) => updateUser({ status: value })}
          defaultValue={user.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="BLOCK">Block</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </PopoverContent>
  );
};

export default EditUser;
