import React from "react";
import ProductCard from "../components/ProductCard";
import getListingProduct from "@/app/actions/getListingProduct";

const Home = async () => {
	const products = await getListingProduct();

	return (
		<div className="mt-5 grid gap-y-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
			{products.data.map((product) => (
				<ProductCard key={product.id} product={product}/>
			))}
		</div>
	);
};

export default Home;
