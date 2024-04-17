"use client";

import MyButton from "@/app/components/Button";
import ProductCard from "@/app/components/product/ProductCard";
import type { ResponseListingProduct } from "@/app/types";
import {
	Button,
	Checkbox,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Slider,
	Spacer,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Category = [
	{
		id: 1,
		name: "Ốp lưng, bao da, Miếng dán điện thoại",
	},
	{
		id: 2,
		name: "Bảo vệ màn hình",
	},
	{
		id: 3,
		name: "Pin Gắn Trong, Cáp và Bộ Sạc",
	},
	{
		id: 4,
		name: "Phụ kiện khác",
	},
];

const ProductClientPage = () => {
	const [priceRange, setPriceRange] = useState<number[] | number>([
		0, 50000000,
	]);
	const params = useSearchParams();
	const route = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handler = setTimeout(() => {
			const _priceRange = priceRange as number[];
			if (_priceRange[0] === 0 && _priceRange[1] === 50000000) {
				return;
			}

			let current_query = {};

			if (params) {
				current_query = qs.parse(params.toString());
			}

			current_query = {
				...current_query,
				minPrice: _priceRange[0],
				maxPrice: _priceRange[1],
			};

			const url = qs.stringify(current_query, { skipNulls: true });
			route.push(`/product?${url}`);
		}, 650);

		return () => {
			clearTimeout(handler);
		};
	}, [priceRange]);

	return (
		<div className="flex flex-col basis-[235px]">
			{/* Category */}
			<div className="flex flex-col">
				<h3>Theo danh mục</h3>
				<div className="flex flex-col">
					{Category.map((c) => (
						<Checkbox key={c.id}>{c.name}</Checkbox>
					))}
				</div>
			</div>
			<Spacer />
			{/* Nơi Bán */}
			<div></div>
			<Spacer />
			{/* Thương Hiệu */}
			<div></div>
			<Spacer />
			{/* Price range */}
			<div>
				<Slider
					label="Giá"
					step={1000000}
					minValue={0}
					maxValue={50000000}
					value={priceRange}
					onChange={setPriceRange}
					formatOptions={{ style: "currency", currency: "VND" }}
					className="max-w-md"
				/>
			</div>
			<Spacer />
			{/* Đánh Giá */}
			<div></div>
		</div>
	);
};

const sort = [
	{
		id: 1,
		name: "Giá thấp đến cao",
	},
	{
		id: 2,
		name: "Giá cao đến thấp",
	},
];

const ProductFilterStatic = () => {
	return (
		<div
			className="flex items-center 
				justify-between bg-white 
				bg-opacity-5 leading-4"
		>
			<div className="text-[#555555] line-clamp-1">Sắp xếp theo</div>
			<div className="flex basis-0 items-center justify-start capitalize">
				<MyButton className="bg-[#ee4d2d] text-white" label={"Liên Quan"} />
				<MyButton className="bg-[#fdfdfd]" label={"Mới Nhất"} />
				<MyButton className="bg-[#fdfdfd]" label={"Bán Chạy"} />
				<Dropdown>
					<DropdownTrigger>
						<Button className="bg-[#fdfdfd]">Sắp Xếp Theo</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownItem key={sort[0].id}>{sort[0].name}</DropdownItem>
						<DropdownItem key={sort[1].id}>{sort[1].name}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<div className="flex gap-2 items-center">
				<span>1/2</span>
				<div>
					<MyButton isIconOnly icon={<MdNavigateBefore />}></MyButton>
					<MyButton isIconOnly icon={<MdNavigateNext />}></MyButton>
				</div>
			</div>
		</div>
	);
};

const ProductItems = ({ products }: { products: ResponseListingProduct }) => {
	return (
		<div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
			{products.data.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export { ProductClientPage, ProductFilterStatic, ProductItems };
