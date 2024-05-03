"use client";

import getReviews from "@/app/actions/review/getReviews";
import { StarRating } from "@/app/components/StarRating";
import { useEffect, useState } from "react";

export default function ProductReview({ idProduct }: { idProduct: number }) {
	const [data, setData] = useState([]);
	const [rateAvg, setRateAvg] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let avg = 0;
		getReviews(idProduct).then((res) => {
			setData(res.data);
			res.data.forEach((item: any) => {
				avg += item.attributes.rating_value;
			});
			setRateAvg(avg / res.data.length);
		});
	}, []);

	return (
		<div>
			<div>
				<h2 className="text-2xl">Đánh giá</h2>
				<span>Rate: {rateAvg}</span>
			</div>
			<div>
				{data.length === 0 && <p>Không có đánh giá</p>}
				{data.map((item: any) => {
					return (
						<div
							className="border-spacing-2 border-gray-200 border-1 p-4 mt-2"
							key={item.id}
						>
							<StarRating
								rating={item.attributes.rating_value}
								setRating={() => {}}
							/>
							<p>{item.attributes.comment}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
