import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routesConfig from "@/config/routes.config";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <form className="max-w-[450px] min-w-[450px] border rounded-[12px] p-[24px] bg-white overflow-hidden">
      <h1 className="text-center text-gray text-[24px] font-[500]">Sign up</h1>
      <div className="flex flex-col gap-[12px] mt-[24px]">
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Full name" />
        <div className="relative">
          <Input type="password" placeholder="Password" />
          <Eye
            className="absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150"
            size={18}
          />
          <EyeOff
            className="hidden absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150"
            size={18}
          />
        </div>
        <div className="relative">
          <Input type="password" placeholder="Confirm password" />
          <Eye
            className="absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150"
            size={18}
          />
          <EyeOff
            className="hidden absolute z-[10] right-[8px] top-[12px] cursor-pointer text-gray hover:text-black duration-150"
            size={18}
          />
        </div>
      </div>
      <Button className="w-full mt-[24px] bg-gradient-to-r from-blue to-pink hover:from-blue/90 hover:to-pink/90 ">
        Registration
      </Button>
      <div className="mt-[48px] flex items-center justify-center space-x-1">
        <span className="text-gray">Do yout have an account?</span>
        <Link
          to={routesConfig.LOGIN}
          className="font-[500] hover:text-gray duration-200"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Registration;
