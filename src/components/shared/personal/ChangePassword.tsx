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
import { Pencil } from "lucide-react";

const ChangePassword = () => {
  return (
    <Dialog>
      <li className="flex items-center gap-[8px] group">
        ********
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
          <Input placeholder="Password" />
          <Input placeholder="New password" />
          <Input placeholder="Confirm new password" />
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

export default ChangePassword;
