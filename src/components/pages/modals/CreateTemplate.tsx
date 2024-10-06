import { CirclePlus, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/services/template.service";
import { queryConfig } from "@/config/query.config";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CreateTemplate = () => {
  const templateService = new TemplateService();
  const { isPending: isThemesPending, data: themes } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATE_THEMES],
    queryFn: async () => await templateService.getThemes(),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[192px] h-[120px] flex items-center justify-center border rounded-md cursor-pointer hover:border hover:border-pink shadow-md overflow-hidden">
          <CirclePlus size={36} className="text-pink" />
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Create template</DialogTitle>
          <DialogDescription className="p-[12px] flex flex-col gap-[16px]">
            {isThemesPending ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="text-blue animate-spin" size={32} />
              </div>
            ) : (
              <>
                <Input required placeholder="Title" />
                <Select required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes?.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <RadioGroup
                  required
                  defaultValue="option-one"
                  className="flex items-center gap-[24px] px-[12px]"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="option-one" />
                    <Label htmlFor="option-one">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="option-two" />
                    <Label htmlFor="option-two">Private</Label>
                  </div>
                </RadioGroup>
                <Button
                  type="submit"
                  className="w-full bg-pink dark:bg-light dark:text-dark hover:bg-pink/80 duration-200 mt-[16px]"
                >
                  Create
                </Button>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplate;
