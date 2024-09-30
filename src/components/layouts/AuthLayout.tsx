import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen w-full bg-[#f2f2f2] flex items-center justify-center">{children}</div>;
};

export default AuthLayout;
