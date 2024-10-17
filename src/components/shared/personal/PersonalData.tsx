import useUserStore from "@/store/users.store";
import ChangeFullName from "./ChangeFullName";
import ChangePassword from "./ChangePassword";

const PersonalData = () => {
  const { user, setUser } = useUserStore();
  return (
    <div className="flex items-center space-x-6">
      <ul className="flex flex-col gap-[4px]">
        <li>Email:</li>
        <li>Full name:</li>
        <li>Password:</li>
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
