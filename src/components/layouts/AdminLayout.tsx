import { ReactNode } from "react";
import AdminSidebar from "../shared/admin/AdminSidebar";
import AdminPanelHeader from "../shared/headers/adminPanelHeader/AdminPanelHeader";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <AdminPanelHeader />
      <div className="container mx-auto flex">
        <AdminSidebar />
        <div className="min-h-[calc(100vh-70px)] w-full p-[16px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
