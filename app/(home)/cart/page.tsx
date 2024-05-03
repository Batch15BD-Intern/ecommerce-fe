"use client";

import React from "react";
import ListCart from "../../components/cart/ListCart";
import React, { Suspense, type ReactNode } from "react";

const CartPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<div>
				<ListCart />
			</div>
		</Suspense>
	);
};

export default CartPage;
