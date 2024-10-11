import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen w-full bg-[#f2f2f2] dark:bg-dark flex items-center justify-center font-sans">{children}</div>;
};

export default AuthLayout;
