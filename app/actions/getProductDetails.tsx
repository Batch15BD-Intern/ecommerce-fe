import { type ResponseProductDetails, URL_API } from "@/app/types";

export default async function getProductDetails(
	id: string,
): Promise<ResponseProductDetails> {
	return fetch(
		`${URL_API}/api/products/${id}?populate[brand][fields][0]=name&populate[category][fields][0]=name&populate[category][populate][parent_category][fields][0]=name&populate[product_items][fields][0]=price&populate[product_items][fields][1]=image&populate[product_items][fields][2]=quantity&populate[product_items][populate][product_config][fields][0]=value&populate[product_items][populate][product_config][populate][variation][fields][0]=name`,
	).then((res) => {
		if (res.ok) {
			return res.json();
		}
		console.log(
			`${res.status} - ${res.json().then((res) => res.error.message)}`,
		);
		throw new Error("Failed to fetch data");
	});
}
