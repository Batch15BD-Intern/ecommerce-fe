"use client";

import { URL_API } from "../types";
import qs from "qs";
export function PostCheckOut(
	jwt: string,
	name: string,
	email: string,
	address: string,
	code: number,
) {
	if (jwt === undefined) return;

	return fetch(`http://localhost:1337/api/checkouts`, {
		method: "POST",
		cache: "reload",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({ data: { name, email, address, code } }),
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
