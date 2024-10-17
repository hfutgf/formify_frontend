import { ReactNode } from "react";
import MainHeader from "../shared/headers/mainHeader/MainHeader";
import SidebarProfile from "../shared/profile/SidebarProfile";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen ">
      <MainHeader />
      <div className="bg-light dark:bg-dark font-sans">
        <div className="min-h-[calc(100vh-70px)] container mx-auto flex">
          <SidebarProfile />
          <div className="w-[85%] p-[16px_20px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
