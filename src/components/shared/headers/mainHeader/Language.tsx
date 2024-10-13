import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Language = () => {
  return (
    <Popover>
      <PopoverTrigger className="border p-2 rounded-sm">EN</PopoverTrigger>
      <PopoverContent className="w-[56px] flex flex-col space-y-1 items-center justify-center">
        <div className="cursor-pointer hover:bg-light dark:hover:bg-dark duration-200 w-full flex items-center justify-center rounded-sm">
          EN
        </div>
        <div className="cursor-pointer hover:bg-light dark:hover:bg-dark duration-200 w-full flex items-center justify-center rounded-sm">
          RU
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Language;
