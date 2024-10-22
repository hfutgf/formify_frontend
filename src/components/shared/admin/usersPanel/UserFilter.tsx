import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import useUserStore from "@/store/users.store";
import { IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  setGetUsersLoading: Dispatch<SetStateAction<boolean>>;
  setGetUsersByRoleLoading: Dispatch<SetStateAction<boolean>>;
}

const UserFilter = ({
  setUsers,
  setGetUsersLoading,
  setGetUsersByRoleLoading,
}: Props) => {
  const [roleValue, setRoleValue] = useState<"USER" | "ADMIN" | string>();

  const { user } = useUserStore();
  const userService = new UserService();

  const { isLoading: getUsersLoading } = useQuery({
    queryKey: [queryConfig.CRUD_USERS + "/all/", user?.id],
    queryFn: async () => {
      const data = await userService.getAllUsers(user?.id);
      if (data) setUsers(data);
      return data;
    },
    enabled: !!user?.id && roleValue === "ALL",
  });

  const { isLoading: getUsersByRoleLoading, refetch: refetchUsers } = useQuery({
    queryKey: [queryConfig.CRUD_USERS + "/role/", user?.id],
    queryFn: async () => {
      const data = await userService.getUsersByRole(roleValue, user?.id);
      if (data) setUsers(data);
      return data;
    },
    enabled: !!user?.id && !!roleValue,
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("roleValue")!);
    if (data) {
      setRoleValue(data);
    }
  }, []);

  useEffect(() => {
    if (roleValue !== "ALL") {
      refetchUsers();
    }
  }, [roleValue, refetchUsers]);

  useEffect(() => {
    setGetUsersLoading(getUsersLoading);
    setGetUsersByRoleLoading(getUsersByRoleLoading);
  }, [
    getUsersByRoleLoading,
    getUsersLoading,
    setGetUsersByRoleLoading,
    setGetUsersLoading,
  ]);

  return (
    <div>
      <Select
        onValueChange={(value) => {
          setRoleValue(value);
          localStorage.setItem("roleValue", JSON.stringify(value));
        }}
        value={roleValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="USER">User</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilter;
