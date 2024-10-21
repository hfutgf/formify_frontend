import UserFilter from "@/components/shared/usersPanel/UserFilter";
import UserList from "@/components/shared/usersPanel/UserList";
import { IUser } from "@/types/user.types";
import { useState } from "react";

const UsersPanel = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [getUsersLoading, setGetUsersLoading] = useState<boolean>(false);
  const [getUsersByRoleLoading, setGetUsersByRoleLoading] =
    useState<boolean>(false);

  return (
    <div>
      <UserFilter
        setUsers={setUsers}
        setGetUsersLoading={setGetUsersLoading}
        setGetUsersByRoleLoading={setGetUsersByRoleLoading}
      />
      <UserList
        users={users}
        getUsersLoading={getUsersLoading}
        getUsersByRoleLoading={getUsersByRoleLoading}
        setUsers={setUsers}
      />
    </div>
  );
};

export default UsersPanel;
