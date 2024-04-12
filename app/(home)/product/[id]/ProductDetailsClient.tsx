"use client";

import Button from "@/app/components/Button";
import ProductGallery from "@/app/components/product/ProductGallery";
import type { ResponseProductDetails } from "@/app/types";
import getMinMaxPrice from "@/app/utility/getMinMaxPrice";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

type variationOptions = {
	id: number;
	option: string;
	value: [
		{
			id: number;
			value: string;
		},
	];
};

type variationSelected = {
	id: number;
	value: number;
};

export default function ProductDetailsClient({
	product,
}: { product: ResponseProductDetails }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [variationOptions, setVariationOptions] = useState<variationOptions[]>(
		[],
	);
	const [selectedVariation, setSelectedVariation] =
		useState<variationSelected>();
	const { minPrice, maxPrice } = getMinMaxPrice(
		product.data.attributes.product_items.data,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!variationOptions) return;
		const _: variationOptions[] = [];
		product.data.attributes.product_items.data.forEach((item) => {
			item.attributes.product_config.data.forEach((variation) => {
				const variation_id = variation.attributes.variation.data.id;
				const element = _.find((item) => item.id === variation_id);
				if (!element) {
					_.push({
						id: variation_id,
						option: variation.attributes.variation.data.attributes.name,
						value: [
							{
								id: variation.id,
								value: variation.attributes.value,
							},
						],
					});
					return;
				}
				if (!element.value.find((item) => item.id === variation.id)) {
					element.value.push({
						id: variation.id,
						value: variation.attributes.value,
					});
				}
			});
		});

		setVariationOptions(_);
	}, []);

	return (
		<div className="flex">
			<div className="w-[450px]">
				<ProductGallery
					product={product}
					thumbsSwiper={thumbsSwiper}
					setThumbsSwiper={setThumbsSwiper}
				/>
			</div>
			<div className="w-full">
				<h1>{product.data.attributes.name}</h1>
				<span>
					{minPrice === maxPrice
						? `đ${minPrice.toLocaleString()}`
						: `đ${minPrice.toLocaleString()} - đ${maxPrice.toLocaleString()}`}
				</span>
				{variationOptions.map((item) => (
					<div>
						<div>{item.option}</div>
						<Divider />
						<div className="flex gap-2">
							{item.value.map((item) => (
								<div>{item.value}</div>
							))}
						</div>
					</div>
				))}
				<Button label="Add to cart" />
			</div>
		</div>
	);
}
