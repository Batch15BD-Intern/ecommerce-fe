"use client";

import type { Product } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import getMinMaxPrice from "../utility/getMinMaxPrice";

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	const { minPrice, maxPrice } = getMinMaxPrice(
		product.attributes.product_items.data,
	);

	return (
		<div className="w-[190px] bg-white cursor-pointer text-sm">
			<Link href={`/product/${product.id}`}>
				<div>
					<div className="w-full h-full">
						<Image
							className="object-cover"
							src={product.attributes.image.data.attributes.url}
							alt={product.attributes.image.data.attributes.name}
							width={190}
							height={190}
						/>
					</div>
					<div className="p-2">
						<span className="line-clamp-2">{product.attributes.name}</span>
						<div>Voucher</div>
						<div className="flex justify-between">
							<span className="text-sm line-clamp-1 align-baseline text-[#EE4D2D]">
								{minPrice === maxPrice
									? `đ${minPrice.toLocaleString()}`
									: `đ${minPrice.toLocaleString()} - đ${maxPrice.toLocaleString()}`}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
