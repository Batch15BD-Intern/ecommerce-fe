"use client";

import { getCartsJwt } from "@/app/actions/api_carts/getCarts";
import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import ListCart from "@/app/components/cart/ListCart";

const CartPage = () => {
	const { jwt } = useAuth();
	const carts = getCartsJwt(jwt);

	useEffect(() => {
		console.log(carts);
	});

	return (
		<div>
			<ListCart />
		</div>
	);
};

export default CartPage;
