import useUserStore from "@/store/users.store";
import ChangeFullName from "./ChangeFullName";
import ChangePassword from "./ChangePassword";
import { useTranslation } from "react-i18next";

const PersonalData = () => {
  const { user, setUser } = useUserStore();
  const { t } = useTranslation();
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
