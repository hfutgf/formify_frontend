import { IUser } from "@/types/user.types";
import { create } from "zustand";

type Store = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

const useUserStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
