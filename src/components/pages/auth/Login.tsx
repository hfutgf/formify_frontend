import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routesConfig from "@/config/routes.config";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILoginForm>();
  const authService = new AuthService();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setIsLoading(true);
    const response = (await authService.login(data)) as AxiosResponse & {
      message: string;
    };
    if (response.status !== 200) {
      setErrorMessage(response.message);
    } else {
      navigate(routesConfig.DASHBOARD);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[450px] min-w-[450px] border rounded-[12px] shadow-md p-[24px] bg-white overflow-hidden "
    >
      <h1 className="text-center text-gray text-[24px] font-[500]">Sign in</h1>
      <div
        className={cn(
          "text-red mt-[24px] text-center",
          errorMessage.length ? "block" : "hidden"
        )}
      >
        {errorMessage}
      </div>
      <div className="flex flex-col gap-[12px] mt-[16px]">
        <Input
          {...register("email", { required: true })}
          type="text"
          placeholder="Email"
        />
        <div className="relative">
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
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
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full mt-[24px] bg-gradient-to-r from-blue to-pink hover:from-blue/90 hover:to-pink/90 "
      >
        Login
      </Button>
      <div className="mt-[48px] flex items-center justify-center space-x-1">
        <span className="text-gray">Don't have an account?</span>
        <Link
          to={routesConfig.REGISTER}
          className="font-[500] hover:text-gray duration-200"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
