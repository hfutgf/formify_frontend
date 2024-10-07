import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditTemplate = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Change your template</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTemplate;
