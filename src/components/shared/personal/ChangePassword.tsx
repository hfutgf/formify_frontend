import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { IUser, TypeUpdateUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  user: IUser | null;
}

interface ChangePasswordForm {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = ({ user }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { register, handleSubmit, reset } = useForm<ChangePasswordForm>();

  const userSerivce = new UserService();
  const { mutate: updateUser, isPending: updateUserPending } = useMutation({
    mutationKey: [queryConfig.CRUD_USERS, user?.id],
    mutationFn: async (body: TypeUpdateUser) =>
      await userSerivce.update(user!.id, body),
    onSuccess: (response) => {
      if (response!.status > 499) {
        toast.error(response?.data);
      } else {
        toast.success("Data was successfully changed");
        setOpenDialog(false);
        reset();
      }
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    if (data.confirmNewPassword === data.newPassword) {
      updateUser({ password: data.newPassword, oldPassword: data.password });
    } else {
      toast.error("Passwords do not match");
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={(value) => setOpenDialog(value)}>
      <li className="flex items-center gap-[8px] group">
        ********
        <DialogTrigger className="select-none">
          <Pencil
            onClick={() => setOpenDialog(true)}
            className="hidden group-hover:block duration-200 cursor-pointer hover:text-primary1"
            size={16}
          />
        </DialogTrigger>
      </li>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Change password name?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[12px]"
        >
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          <Input
            {...register("newPassword", { required: true })}
            type="password"
            placeholder="New password"
          />
          <Input
            {...register("confirmNewPassword", { required: true })}
            type="password"
            placeholder="Confirm new password"
          />
          <Button
            disabled={updateUserPending}
            type="submit"
            className="w-full bg-primary1 hover:bg-primary1/70 duration-300 "
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
