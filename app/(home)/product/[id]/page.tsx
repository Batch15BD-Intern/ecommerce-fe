import getProductDetails from "@/app/actions/getProductDetails";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductDetailPage({ params }: Props) {
	const product = await getProductDetails(params.id);

	return (
		<div>
			<div className="mt-[1.265rem] bg-white pt-[1.265rem]">
				<ProductDetailsClient product={product} />
				<div className="flex gap-4">
					<div
						className="w-2/3 p-2"
						dangerouslySetInnerHTML={{
							__html: product.data.attributes.description,
						}}
					/>
					<div></div>
				</div>
			</div>
		</div>
	);
}
