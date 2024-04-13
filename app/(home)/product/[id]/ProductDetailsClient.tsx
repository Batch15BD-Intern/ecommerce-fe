"use client";

import MyButton from "@/app/components/Button";
import ProductGallery from "@/app/components/product/ProductGallery";
import type { ResponseProductDetails } from "@/app/types";
import getMinMaxPrice from "@/app/utility/getMinMaxPrice";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";

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
						<div className="flex gap-2">
							{item.value.map((item) => (
								<MyButton label={item.value} />
							))}
						</div>
					</div>
				))}
				<div className="pt-2">
					<div>Số lượng</div>
					<div></div>
				</div>
				<div className="pt-2">
					<MyButton
						className="m-2 bg-[#ee4d2d] bg-opacity-10 text-medium text-[#FF5722] outline-1 outline-[#ee4d2d]"
						label="Add to cart"
						icon={<BsCartPlus />}
					/>
					<MyButton
						className="bg-[#ee4d2d] text-medium text-white"
						label="Add to cart"
						icon={<BsCartPlus />}
					/>
				</div>
			</div>
		</div>
	);
}
