import { create } from "zustand";
import type { User } from "../types";

type AuthStore = {
	jwt: string;
	user?: User;
	save_token: (_jwt: string, _user: User) => void;
	logout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
	jwt: localStorage.getItem("jwt") ?? "",
	user: JSON.parse(localStorage.getItem("user") ?? ""),
	save_token: (_jwt: string, _user: User) => {
		localStorage.setItem("jwt", _jwt);
		localStorage.setItem("user", JSON.stringify(_user));
		set({
			jwt: _jwt,
			user: _user,
		});
	},
	logout: () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		set({
			jwt: "",
			user: undefined,
		});
	},
}));
