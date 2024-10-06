import React from "react";
import Header from "../shared/layout/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className="bg-light dark:bg-dark font-sans">{children}</div>
    </div>
  );
};

export default DashboardLayout;
