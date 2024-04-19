import getProductDetails from "@/app/actions/getProductDetails";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductDetailPage({ params }: Props) {
	const product = await getProductDetails(params.id);
	const product_attributes: any = product.data.attributes.attributes;

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
					<div className="flex flex-col">
						<table className="">
							{Object.keys(product_attributes).map((key) => (
								<tr key={key}>
									<td className="line-clamp-1">{key}</td>
									<td>{product_attributes[key]}</td>
								</tr>
							))}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
