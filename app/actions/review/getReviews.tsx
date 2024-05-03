import { URL_API } from "@/app/types";
import qs from "qs";

export default async function getReviews({ idProduct }: any) {
	const _query = qs.stringify({
		filters: {
			order_line: {
				product_item: {
					product: {
						id: {
							$eq: idProduct,
						},
					},
				},
			},
		},
		pagination: {
			pageSize: 10,
		},
		fields: ["rating_value", "comment", "createdAt"],
	});

	return await fetch(`${URL_API}/api/user-reviews?${_query}`).then((res) =>
		res.json(),
	);
}
