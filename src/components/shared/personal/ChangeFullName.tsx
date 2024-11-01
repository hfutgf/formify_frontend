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
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

const ChangeFullName = ({ user, setUser }: Props) => {
  const [value, setValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const userSerivce = new UserService();
  const { t } = useTranslation();

  const { mutate: updateUser, isPending: updateUserPending } = useMutation({
    mutationKey: [queryConfig.CRUD_USERS, user?.id],
    mutationFn: async (body: TypeUpdateUser) =>
      await userSerivce.update(user!.id, body),
    onSuccess: (data) => {
      if (data) {
        setUser(data);
      }
      toast.success("Data was successfully changed");
      setOpenDialog(false);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ fullName: value });
  };
  return (
    <Dialog onOpenChange={(e) => setOpenDialog(e)} open={openDialog}>
      <li className="flex items-center gap-[8px] group">
        {user?.fullName}
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
          <DialogTitle>{t("Change full name?")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-[12px]">
          <Input
            required={true}
            placeholder={t("full-name")}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={updateUserPending}
            type="submit"
            className="w-full bg-primary1 hover:bg-primary1/70 duration-300 "
          >
            {t("save")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeFullName;
