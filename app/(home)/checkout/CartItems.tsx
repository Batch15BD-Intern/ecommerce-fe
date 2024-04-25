import type { ResponseCart } from "@/app/types";
import Image from "next/image";

interface CartItemProps {
	carts: ResponseCart | undefined;
}

export default function CartItem({ carts }: CartItemProps) {
	return (
		<>
			<div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
				<h2 className="text-2xl font-extrabold text-[#f58255]">
					Order Summary
				</h2>
				<div className="space-y-6 mt-10">
					{carts?.data.map((item) => (
						<div
							className="grid sm:grid-cols-2 items-start gap-6"
							key={item.id}
						>
							<div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
								<Image
									width={50}
									height={50}
									src={item.product_item.image[0].formats.thumbnail.url}
									alt="a"
									className="w-full object-contain"
								/>
							</div>
							<div>
								<h3 className="text-base text-[#333]">
									{item.product_item.name}
								</h3>
								<ul className="text-xs text-[#333] space-y-2 mt-2">
									<li className="flex flex-wrap gap-4">
										Size <span className="ml-auto">2</span>
									</li>
									<li className="flex flex-wrap gap-4">
										Quantity <span className="ml-auto">{item.quantity}</span>
									</li>
									<li className="flex flex-wrap gap-4">
										Total Price{" "}
										<span className="ml-auto">
											{(
												item.product_item.price * item.quantity
											).toLocaleString()}
											đ
										</span>
									</li>
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
