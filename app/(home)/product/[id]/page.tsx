import getProductDetails from "@/app/actions/getProductDetails";

type Props = {
	params: { id: string };
};

export default async function ProductDetailPage({params}: Props) {

	const product = await getProductDetails(params.id);

	return <div>
		<div>

		</div>
		<div dangerouslySetInnerHTML={{__html: product.data.attributes.description}}/>
	</div>;
}
