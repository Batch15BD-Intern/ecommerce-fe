"use client";

import { getCarts } from "@/app/actions/getCarts";
import { useEffect } from "react";

const CartPage = () => {
	const carts = getCarts();
	
	useEffect(() => {
		console.log(carts);
	});

	return <div></div>;
};

export default CartPage;
