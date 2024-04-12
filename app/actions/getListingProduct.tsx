import { type ResponseListingProduct, URL_API } from "@/app/types";

export default async function getListingProduct(): Promise<ResponseListingProduct> {
	return fetch(
		`${URL_API}/api/products?populate[category][fields][0]=id&populate[category][fields][1]=name&populate[category][fields][2]=locale&populate[category][populate][promotions]=*&populate[category][populate][parent_category][fields][0]=id&populate[category][populate][parent_category][fields][1]=name&populate[category][populate][parent_category][fields][2]=locale&populate[category][populate][parent_category][populate][promotions]=*&populate[brand][fields][0]=name&populate[image][populate][fields][0]=formats&populate[product_items][fields][0]=id&populate[product_items][fields][1]=price&fields[0]=name&fields[1]=physical_product`,
		{
			cache: "reload",
		},
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
