"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "../components/Button";
import { URL_API } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
	const { user } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { save_token } = useAuth();
	const route = useRouter();

	useEffect(() => {
		if (user) {
			route.push("/");
		}
	});

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await fetch(`${URL_API}/api/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					alert(res.error.message);
					return;
				}
				save_token(res.jwt, res.user);
			});
	};

	return (
		<form className="grid grid-cols-2 max-w-64" onSubmit={handleLogin}>
			<label htmlFor="">Email: </label>
			<input
				id="email"
				name="email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="">Password: </label>
			<input
				id="password"
				name="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className="">
				<Button
					type="submit"
					outline
					label={"Login"}
					onClick={() => {}}
				></Button>
			</div>
		</form>
	);
}
