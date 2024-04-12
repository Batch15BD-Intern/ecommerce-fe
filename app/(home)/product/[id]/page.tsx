import getProductDetails from "@/app/actions/getProductDetails";
import ProductGallery from "@/app/components/product/ProductGallery";

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductDetailPage({ params }: Props) {
	const product = await getProductDetails(params.id);

	return (
		<div>
			<div className="bg-white">
				<div className="flex">
					<div className="w-[450px]">
						<ProductGallery product={product} />
					</div>
					<div>
						<h1>{product.data.attributes.name}</h1>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}
