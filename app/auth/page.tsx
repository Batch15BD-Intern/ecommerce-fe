"use client";

import { useState, type FormEvent } from "react";
import Button from "../components/Button";
import { type ResponseAuth, URL_API } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { save_token } = useAuth();

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response: ResponseAuth = await fetch(`${URL_API}/api/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: email,
				password: password,
			}),
		}).then((res) => res.json());

		save_token(response.jwt, response.user);
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
