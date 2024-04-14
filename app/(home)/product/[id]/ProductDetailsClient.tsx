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
	const [selectedVariation, setSelectedVariation] = useState<
		variationSelected[]
	>([]);
	const { minPrice, maxPrice } = getMinMaxPrice(
		product.data.attributes.product_items.data,
	);
	const [price, setPrice] = useState(0);

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

	const handleSelectVariation = (variation: variationSelected) => {
		const _: variationSelected[] = [...selectedVariation];
		const find = _.find((item) => item.id === variation.id);

		if (find) {
			_.splice(_.indexOf(find), 1);
		}
		_.push(variation);

		if (_.length !== variationOptions.length) {
			setSelectedVariation(_);
			return;
		}

		product.data.attributes.product_items.data.forEach((_item) => {
			_item.attributes.product_config.data.find((_variation) => {
				if (
					_variation.attributes.variation.data.id === variation.id &&
					_variation.id === variation.value
				) {
					// console.log(`${_item.attributes.price}`);
					// console.log(_variation);
				}
			});
		});

		setSelectedVariation(_);
	};

	const isSelectedVariation = (variation: variationSelected) => {
		return selectedVariation.find(
			(item) => item.id === variation.id && item.value === variation.value,
		);
	};

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
					{price !== 0
						? `đ${price.toLocaleString()}`
						: minPrice === maxPrice
							? `đ${minPrice.toLocaleString()}`
							: `đ${minPrice.toLocaleString()} - đ${maxPrice.toLocaleString()}`}
				</span>
				{variationOptions.map((variation) => (
					<div key={variation.id}>
						<div>{variation.option}</div>
						<div className="flex gap-2">
							{variation.value.map((option) => (
								<MyButton
									key={option.id}
									label={option.value}
									className={
										isSelectedVariation({
											id: variation.id,
											value: option.id,
										})
											? `bg-neutral-600`
											: ``
									}
									onClick={() => {
										handleSelectVariation({
											id: variation.id,
											value: option.id,
										});
									}}
								/>
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
						className="m-2 bg-[#ee4d2d] bg-opacity-10 
						text-medium text-[#FF5722] outline-1
						outline-[#ee4d2d]"
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
