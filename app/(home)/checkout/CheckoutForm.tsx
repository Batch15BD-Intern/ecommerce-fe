import { PostCheckOut } from "@/app/actions/PostCheckOut";
import Failure from "@/app/components/message/failure";
import Success from "@/app/components/message/success";
import { useAuth } from "@/app/hooks/useAuth";
import type { ResponseCart } from "@/app/types";
import { useState } from "react";
interface CartItemProps {
	carts: ResponseCart | undefined;
}
export default function CheckOutForm({ carts }: CartItemProps) {
	const { jwt } = useAuth();
	const [showBill, setShowBill] = useState(false);
	const [postSuccess, setPostSuccess] = useState(false);
	const [postFailure, setFailureSuccess] = useState(false);

	const [checkoutInfo, setCheckOutInfo] = useState({
		name: "",
		email: "",
		address: "",
		code: 0,
	});

	const handleConfirmPayment = () => {
		setShowBill(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCheckOutInfo({ ...checkoutInfo, [name]: value });
	};
	const handleMessage = () => {
		window.location.reload();
	};
	const handlePostCheckOut = async () => {
		try {
			await PostCheckOut(
				jwt,
				checkoutInfo.name,
				checkoutInfo.email,
				checkoutInfo.address,
				checkoutInfo.code,
			);
			setShowBill(false);
			setPostSuccess(true);
		} catch (error) {
			setShowBill(false);
			setFailureSuccess(true);
		}
	};
	return (
		<>
			{postSuccess && (
				<>
					<Success handleMessage={handleMessage} />
				</>
			)}
			{postFailure && (
				<>
					<Failure handleMessage={handleMessage} />
				</>
			)}
			<div className="text-center max-lg:hidden">
				<h2 className="text-3xl font-extrabold text-[#f58255] inline-block border-b-4 border-[#333] pb-1">
					Checkout
				</h2>
			</div>
			<form className="lg:mt-12">
				<div>
					<h2 className="text-2xl font-extrabold text-[#f58255]">
						Shipping info
					</h2>
					<div className="grid grid-cols-2 gap-6 mt-8">
						<input
							type="text"
							placeholder="name"
							name="name"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="email"
							placeholder="Email address"
							name="email"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="text"
							name="address"
							placeholder="address"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
						<input
							type="number"
							placeholder="Postal code"
							name="code"
							onChange={handleChange}
							className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
						/>
					</div>
				</div>

				<div className="flex flex-wrap gap-4 mt-8 justify-center">
					<button
						type="button"
						className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
					>
						Back
					</button>
					<button
						type="button"
						className="min-w-[150px] px-6 py-3.5 text-sm bg-[#f58255] text-white rounded-md hover:bg-[#111]"
						onClick={handleConfirmPayment}
					>
						Confirm payment{" "}
						{carts?.data
							.reduce(
								(total, item) =>
									total + item.product_item.price * item.quantity,
								0,
							)
							.toLocaleString()}
						đ
					</button>
				</div>
			</form>
			{showBill && (
				<div
					className="  fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
					onClick={() => setShowBill(false)}
				>
					<div
						className="absolute bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8"
						style={{ width: "500px", height: "600px" }}
						onClick={(e) => e.stopPropagation()}
					>
						<h1 className="font-bold text-2xl my-4 text-center text-blue-600">
							KRP Services
						</h1>
						<hr className="mb-2" />

						<div className="flex justify-between mb-6">
							<h1 className="text-lg font-bold">Invoice</h1>
							<div className="text-gray-700">
								<div>Date: 01/05/2023</div>
								<div>Invoice #: INV12345</div>
							</div>
						</div>
						<div className="mb-8">
							<h2 className="text-lg font-bold mb-4">Bill To:</h2>
							<div className="text-gray-700 mb-2">
								<span>Your name:</span>
								{"  "}
								{checkoutInfo.name}
							</div>
							<div className="text-gray-700 mb-2">
								<span>Your email:</span>
								{"  "}
								{checkoutInfo.email}
							</div>
							<div className="text-gray-700 mb-2">
								<span>Your address:</span>
								{"  "}
								{checkoutInfo.address}
							</div>
							<div className="text-gray-700">
								<span>Your postal code:</span>
								{"  "}
								{checkoutInfo.code}
							</div>
						</div>
						<table className="w-full mb-8">
							<thead>
								<tr>
									<th className="text-left font-bold text-gray-700">
										Description
									</th>
									<th className="text-right font-bold text-gray-700">Amount</th>
								</tr>
							</thead>
							<tbody>
								{carts?.data.map((item) => (
									<tr key={item.product_item.id}>
										<td className="text-left text-gray-700">
											{item.product_item.name}{" "}
										</td>
										<td className="text-right text-gray-700">
											{(
												item.product_item.price * item.quantity
											).toLocaleString()}{" "}
											đ
										</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<td className="text-left font-bold text-gray-700">Total</td>
									<td className="text-right font-bold text-gray-700">
										{carts?.data
											.reduce(
												(total, item) =>
													total + item.product_item.price * item.quantity,
												0,
											)
											.toLocaleString()}
										đ
									</td>
								</tr>
							</tfoot>
						</table>

						<div className="text-gray-700 text-sm text-center">
							Have you confirmed checkout for this order?
						</div>
						<div className="btn-bill flex justify-between">
							<button
								className="bg-[#f58255] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => setShowBill(false)}
							>
								Cancel
							</button>
							<button
								className="bg-[#f58255] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handlePostCheckOut}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
