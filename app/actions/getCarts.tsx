"use client";

import { useAuth } from "../hooks/useAuth";
import { type ResponseCart, URL_API } from "../types";

export function getCarts(): Promise<ResponseCart> | undefined {
	const { user } = useAuth();
	if (user === undefined) return;

	return fetch(`${URL_API}/api/carts?`, {
		cache: "reload",
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		console.log(
			`${res.status} - ${res.json().then((res) => res.error.message)}`,
		);
		throw new Error("Failed to fetch data");
	});
}
