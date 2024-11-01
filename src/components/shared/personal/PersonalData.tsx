import { useParams } from "react-router-dom";
import ChangeFullName from "./ChangeFullName";
import ChangePassword from "./ChangePassword";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/config/query.config";
import { UserService } from "@/services/user.service";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user.types";
import Loading from "@/components/pages/loading/Loading";

const PersonalData = () => {
  const [user, setUser] = useState<IUser>();
  const { t } = useTranslation();
  const { userId } = useParams();


  useEffect(() => {
    if (userId?.length) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }
  }, [userId]);

  const userService = new UserService();

  const { data: userData, isLoading: getUserLoading } = useQuery({
    queryKey: [queryConfig.CRUD_USERS, userId],
    queryFn: async () => await userService.getUser(Number(userId)),
  });

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  if (getUserLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center space-x-6">
      <ul className="flex flex-col gap-[4px]">
        <li>{t("email")}:</li>
        <li>{t("full-name")}:</li>
        <li>{t("password")}:</li>
      </ul>
      <ul className="flex flex-col gap-[4px]">
        <li>{user?.email}</li>
        <ChangeFullName user={user} setUser={setUser} />
        <ChangePassword user={user} />
      </ul>
    </div>
  );
};

export default PersonalData;
