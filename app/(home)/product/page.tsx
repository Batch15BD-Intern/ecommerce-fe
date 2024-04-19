import getListingProductWithFilter from "@/app/actions/getListingProductWithFilter";
import type { SearchParams } from "@/app/types";
import qs from "qs";
import {
	ProductClientPage,
	ProductFilterStatic,
	ProductItems,
} from "./ProductClient";

interface ProductsPageProps {
	searchParams?: string;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
	const parsedParams: SearchParams = qs.parse(searchParams ?? "") as any;
	const products = await getListingProductWithFilter({
		page: 1,
		pageSize: 10,
		query: parsedParams?.query,
		minPrice: parsedParams?.minPrice,
		maxPrice: parsedParams?.maxPrice,
		brand: parsedParams?.brand,
		categories: parsedParams?.categories,
		stars: parsedParams?.stars,
		attribute: parsedParams?.attribute,
	});

	return (
		<div className="flex gap-5 pt-4">
			<ProductClientPage />
			<div className="flex flex-col gap-4 w-full">
				<ProductFilterStatic />
				{parsedParams?.query && (
					<div>
						<span>Kết quả tìm kiếm cho từ khoá `{parsedParams.query}`</span>
					</div>
				)}
				<ProductItems products={products} />
			</div>
		</div>
	);
};

export default ProductsPage;
