import React from "react";
import Header from "../shared/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className="bg-light font-sans">{children}</div>
    </div>
  );
};

export default DashboardLayout;
