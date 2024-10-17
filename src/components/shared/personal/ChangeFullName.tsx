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
import { IUser } from "@/types/user.types";
import { Pencil } from "lucide-react";

interface Props {
  user: IUser | null;
}

const ChangeFullName = ({ user }: Props) => {
  return (
    <Dialog>
      <li className="flex items-center gap-[8px] group">
        {user?.fullName}
        <DialogTrigger className="select-none">
          <Pencil
            className="hidden group-hover:block duration-200 cursor-pointer hover:text-primary1"
            size={16}
          />
        </DialogTrigger>
      </li>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Change full name?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-[12px]">
          <Input placeholder="Full name" />
          <Button
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

export default ChangeFullName;
