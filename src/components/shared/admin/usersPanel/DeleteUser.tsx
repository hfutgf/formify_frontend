import { Button } from "@/components/ui/button";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import useUserStore from "@/store/users.store";
import { IUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  user: IUser;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const DeleteUser = ({ user, setUsers }: Props) => {
  const { user: admin } = useUserStore();
  const userService = new UserService();

  const { mutate: deleteUser, isPending: deleteLoading } = useMutation({
    mutationKey: [queryConfig.CRUD_USERS, admin?.id, user.id],
    mutationFn: async () =>
      await userService.deleteFromUser(admin?.id, user?.id),
    onSuccess: (data) => {
      if (data) setUsers((prev) => prev.filter((item) => item.id !== data.id));
      return data;
    },
  });

  return (
    <Button
      disabled={deleteLoading}
      onClick={() => {
        deleteUser();
      }}
      variant={"destructive"}
    >
      <Trash />
    </Button>
  );
};

export default DeleteUser;
