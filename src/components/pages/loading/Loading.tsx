import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-screen w-full flex items-center justify-center">
      <LoaderCircle className="text-blue animate-spin" size={32} />
    </div>
  );
};

export default Loading;
