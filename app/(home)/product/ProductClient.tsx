"use client";

import getBrands from "@/app/actions/getBrands";
import getCategories from "@/app/actions/getCategories";
import MyButton from "@/app/components/Button";
import ProductCard from "@/app/components/product/ProductCard";
import { useBrand } from "@/app/hooks/useBrand";
import { useCategory } from "@/app/hooks/useCategory";
import type { ResponseListingProduct } from "@/app/types";
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Radio,
	RadioGroup,
	Slider,
	Spacer,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ProductClientPage = () => {
	const [currentBrands, setCurrentBrands] = useState(-1);
	const [category, setCategory] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<number[] | number>([
		0, 50000000,
	]);
	const params = useSearchParams();
	const route = useRouter();
	const { brands, save_brands } = useBrand();
	const { categories, save_categories } = useCategory();
	const [showAllCategory, setShowAllCategory] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (brands && brands?.length > 0) {
			return;
		}
		getBrands().then((res) => {
			save_brands(res.data);
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (categories && categories.length > 0) {
			return;
		}
		getCategories().then((res) => {
			save_categories(res.data);
		});
	}, []);

	// PRICE RANGE
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

	// BRANDS
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentBrands === -1) return;
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			brand: currentBrands,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [currentBrands]);

	// CATEGORY
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			categories: category.length > 0 ? category : null,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [category]);

	return (
		<div className="flex flex-col basis-[235px]">
			{/* Category */}
			<div className="flex flex-col">
				<h3>Theo danh mục</h3>
				<div className="flex flex-col">
					<CheckboxGroup value={category} onValueChange={setCategory}>
						{categories?.slice(0, 4).map((c) => (
							<Checkbox key={c.id} value={c.id.toString()}>
								{c.attributes.name}
							</Checkbox>
						))}
						{categories && categories?.length > 4 && !showAllCategory && (
							<button onClick={() => setShowAllCategory(true)}>Xem thêm</button>
						)}
						{showAllCategory &&
							categories?.slice(4).map((c) => (
								<Checkbox key={c.id} value={c.id.toString()}>
									{c.attributes.name}
								</Checkbox>
							))}
					</CheckboxGroup>
				</div>
			</div>
			<Spacer />
			{/* Nơi Bán */}
			<div></div>
			<Spacer />
			{/* Thương Hiệu */}
			<div>
				<h3>Thương hiệu</h3>
				<div className="flex flex-col">
					<RadioGroup>
						{brands?.map((b) => (
							<Radio
								key={b.id}
								value={b.attributes.name}
								onChange={() => setCurrentBrands(b.id)}
							>
								{b.attributes.name}
							</Radio>
						))}
					</RadioGroup>
				</div>
			</div>
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
