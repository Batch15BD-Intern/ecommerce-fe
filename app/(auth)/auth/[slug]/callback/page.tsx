"use client";

import { URL_API } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type GetAccessTokenResponse = {
	jwt: string;
	user: User;
};

type User = {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	phone: string | null;
};

export default function AuthCallback() {
	const router = useSearchParams();
	const params = Object.fromEntries(router.entries());

	const [jwt, setJwt] = useState("");
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetch(
			`${URL_API}/api/auth/github/callback?access_token=${params.access_token}`,
		).then((res) => {
			res.json().then((resJson: GetAccessTokenResponse) => {
				setJwt(resJson.jwt);
				setUser(resJson.user);
			});
		});

		fetch(`${URL_API}/api/users/me`, {
			headers: {
				Authorization: `Bearer ${params.access_token}`,
			},
		}).then((res) => {
			console.log("res", res);
		});
	});

	return (
		<div>
			<h1>Auth</h1>
			<span>Hello {user?.username}</span>
		</div>
	);
}