import { CgTrash } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { getCartsJwt } from "../../actions/api_carts/getCarts";
import { useAuth } from "../../hooks/useAuth";
import type { ResponseCart, ResponseDiscount } from "../../types";
import Counter from "./CounterinCart";
import { deleteCart } from "@/app/actions/api_carts/deleteCarts";
import { getDiscount } from "@/app/actions/api_carts/getDiscount";

export default function ListCart() {
	const [carts, setCarts] = useState<ResponseCart | null>(null);
	const [discount, setDiscount] = useState<ResponseDiscount | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
	const { jwt } = useAuth();
	const [voucher, setVoucher] = useState("");
	const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(
		null,
	);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVoucher(event.target.value);
	};

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[productId]: newQuantity,
		}));
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		if (carts) {
			carts.data.forEach((item) => {
				const productPrice = item.product_item.price;
				const quantity = quantities[item.id] || item.quantity;
				totalPrice += productPrice * quantity;
			});
		}
		return totalPrice;
	};
	const handleDelete = (id: number) => {
		deleteCart(id, jwt);
	};
	const handleAddDiscount = () => {
		getDiscount(jwt)?.then((res) => {
			if (res?.data) {
				const selectedDiscount = res.data.find(
					(item) => item.attributes.discount_code === voucher,
				);
				if (selectedDiscount) {
					setDiscount(res);
					setSelectedDiscountId(selectedDiscount.id);
				} else {
					alert("Mã giảm giá không tồn tại!");
					window.location.reload();
				}
			} else {
				alert("Mã giảm giá không tồn tại!");
			}
		});
	};

	useEffect(() => {
		if (!carts) return;
		const initialQuantity = carts.data.length > 0 ? carts.data[0].quantity : 1;
		setQuantity(initialQuantity);
	}, [carts]);

	useEffect(() => {
		getCartsJwt(jwt)?.then((res) => {
			setCarts(res);
		});
	}, [jwt]);

	return (
		<div>
			<div className="mx-auto max-w-screen-2xl p-2 lg:rounded-none mt-7">
				<section className="text-gray-600 body-font">
					<div className="container px-5 py-5 mx-auto flex flex-wrap">
						<div className="flex flex-col flex-wrap px-5 py-6 lg:w-2/3 mr-2 -ml-2 bg-gray-100">
							<div className=" w-full mx-auto ">
								<table className="w-full text-left">
									<thead>
										<tr>
											<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
												Products
											</th>

											<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
												Quanlity
											</th>
											<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
												Totals
											</th>
											<th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{carts?.data.map((item) => (
											<tr key={item.id}>
												<td className="px-4 py-3">
													<div>
														<div className="flex w-full mb-3">
															<div className="p-2 w-full">
																<div className="flex">
																	<img
																		alt="ecommerce"
																		className="block object-cover object-center w-[27%] h-[27%]"
																		src={
																			item.product_item.image[0].formats
																				.thumbnail.url
																		}
																	/>
																	<div>
																		<Typography
																			color="blue-gray"
																			className="text-sm font-bold"
																			placeholder=""
																			onPointerEnterCapture={() => {}}
																			onPointerLeaveCapture={() => {}}
																		>
																			{item.product_item.name}
																		</Typography>
																		<Typography
																			color="blue-gray"
																			className="text-sm font-bold mt-4"
																			placeholder=""
																			onPointerEnterCapture={() => {}}
																			onPointerLeaveCapture={() => {}}
																		>
																			{item.product_item.price.toLocaleString()}
																			đ
																		</Typography>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</td>

												<td
													className="px-4 py-3 text-center text-black"
													defaultValue="2"
												>
													<Counter
														cartId={item.id}
														quantity={quantities[item.id] || item.quantity}
														onQuantityChange={(newQuantity: number) =>
															handleQuantityChange(item.id, newQuantity)
														}
														productitem={item.product_item.id}
													/>
												</td>
												<td className="px-4 py-3">
													<Typography
														color="blue-gray"
														className="text-sm font-bold ml-auto mt-1 text-black text-center"
														placeholder=""
														onPointerEnterCapture={() => {}}
														onPointerLeaveCapture={() => {}}
													>
														{(
															item.product_item.price *
															(quantities[item.id] || item.quantity)
														).toLocaleString()}
														đ
													</Typography>
												</td>
												<td className="text-center">
													<CgTrash
														onClick={() => handleDelete(item.id)}
														className="text-sm mx-auto text-red-500 h-6 w-6 cursor-pointer "
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex flex-col flex-wrap px-5 py-6 w-full lg:w-1/3 ml-2 -mr-2 ">
							<div className="col-span-4 border border-gray-200 p-4 rounded bg-gray-200 ">
								<h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
									Voucher
								</h4>

								<div className="flex justify-center border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
									<div className="relative flex w-full max-w-[24rem] items-center">
										<Input
											type="text"
											label="Mã giảm giá"
											value={voucher}
											onChange={onChange}
											className="pr-20"
											placeholder=""
											onPointerEnterCapture={() => {}}
											onPointerLeaveCapture={() => {}}
											crossOrigin={() => {}}
											containerProps={{
												className: "min-w-0",
											}}
										/>
										<Button
											size="sm"
											color={voucher ? "gray" : "blue-gray"}
											disabled={!voucher}
											className="!absolute right-1 top-1 rounded"
											placeholder=""
											onPointerEnterCapture={() => {}}
											onPointerLeaveCapture={() => {}}
											onClick={handleAddDiscount}
										>
											Áp dụng
										</Button>
									</div>
								</div>
							</div>

							<div className="col-span-4 border border-gray-200 p-4 rounded bg-gray-200 ">
								<div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
									<p>Tạm tính</p>
									<p>{calculateTotalPrice().toLocaleString()} đ</p>
								</div>
								{discount?.data
									.filter((item) => item.id === selectedDiscountId)
									.map((item) => (
										// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
										<>
											<div
												className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas"
												key={item.id}
											>
												<p>Loại giảm giá</p>
												{item.attributes.type}
											</div>
											<div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
												<p>Tiền giảm</p>
												{item.attributes.type === "percentage"
													? `- ${(
															item.attributes.discount_amount *
															calculateTotalPrice()
														).toLocaleString()} đ`
													: `- ${item.attributes.discount_amount.toLocaleString()} đ`}
											</div>
											<div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
												<p className="font-semibold">Tổng tiền</p>
												<p>
													{item.attributes.type === "percentage"
														? ` ${(
																calculateTotalPrice() -
																(discount?.data.find(
																	(item) => item.id === selectedDiscountId,
																)?.attributes.discount_amount || 0) *
																	calculateTotalPrice()
															).toLocaleString()}đ`
														: ` ${(
																calculateTotalPrice() -
																(discount?.data.find(
																	(item) => item.id === selectedDiscountId,
																)?.attributes.discount_amount || 0)
															).toLocaleString()}đ`}
												</p>
											</div>
										</>
									))}

								<Button
									size="md"
									color="red"
									className="w-full text-black text-xl"
									variant="filled"
									placeholder=""
									onPointerEnterCapture={() => {}}
									onPointerLeaveCapture={() => {}}
								>
									Thanh toán
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}