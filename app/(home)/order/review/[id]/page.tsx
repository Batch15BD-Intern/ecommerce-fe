"use client";

import { StarRating } from "@/app/components/StarRating";
import { useAuth } from "@/app/hooks/useAuth";
import { URL_API } from "@/app/types";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
	params: {
		id: string;
	};
};

export default function ReviewOrder({ params }: Props) {
	const [value, setValue] = useState("");
	const [rating, setRating] = useState(4);
	const router = useRouter();
	const { jwt } = useAuth();

	const handleSubmit = () => {
		fetch(`${URL_API}/api/user-reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify({
				data: {
					rating_value: rating,
					comment: value,
					order_line: {
						id: params.id,
					},
				},
			}),
		}).then((res) => {
			if (!res.ok) {
				console.log(res);
				return;
			}
			router.back();
		});
	};

	return (
		<div className="flex flex-col gap-2">
			<h1>Review Order</h1>

			<StarRating rating={rating} setRating={setRating} />
			<Textarea
				variant="underlined"
				label="Review"
				labelPlacement="outside"
				placeholder="Enter your review"
				value={value}
				onValueChange={setValue}
			/>
			<Button color="primary" onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	);
}
