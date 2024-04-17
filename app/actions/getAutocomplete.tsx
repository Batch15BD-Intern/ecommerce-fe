import qs from "qs";
import { type ResponseListingProduct, URL_API } from "../types";

export default function getAutocomplete(
	query: string,
): Promise<ResponseListingProduct> {
	const _query = qs.stringify({
		filters: {
			name: {
				$containsi: query,
			},
		},
		fields: ["name"],
		pagination: {
			pageSize: 10,
			page: 1,
		},
	});

	return fetch(`${URL_API}/api/products?${_query}`, {
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
