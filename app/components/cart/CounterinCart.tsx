import { putCart } from "@/app/actions/api_carts/putCart";
import { useAuth } from "@/app/hooks/useAuth";

interface InputCounterProps {
	quantity: number;
	cartId: number;
	onQuantityChange: (newQuantity: number) => void;
	productitem: number;
}

export default function Counter({
	quantity,
	cartId,
	onQuantityChange,
	productitem,
}: InputCounterProps) {
	const { jwt } = useAuth();
	const increaseQuantity = async () => {
		const newQuantity = quantity + 1;
		onQuantityChange(newQuantity);
		await handlePutQuantity(newQuantity, productitem);
	};

	const decreaseQuantity = async () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			onQuantityChange(newQuantity);
			await handlePutQuantity(newQuantity, productitem);
		}
	};

	const handlePutQuantity = async (
		newQuantity: number,
		productitem: number,
	) => {
		try {
			const response = await putCart(cartId, jwt, newQuantity, productitem);
			//   window.location.reload();
			console.log("Update successful:", response);
			// Optional: Add a delay or perform any other actions after updating quantity
		} catch (error) {
			console.error("Update failed:", error);
			// Handle errors here
		}
	};
	return (
		<div className=" flex mt-3">
			<label
				htmlFor="quantity-input"
				className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
			>
				SL:
			</label>
			<div className="relative flex max-w-[8rem] items-center ml-3 -mt-2">
				<button
					type="button"
					id="decrement-button"
					data-input-counter-decrement="quantity-input"
					className="h-7 rounded-s-lg border border-gray-300 
					bg-gray-300 p-3 hover:bg-gray-400 focus:outline-none 
					 focus:ring-gray-100 dark:border-gray-600 
					dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
					onClick={decreaseQuantity}
				>
					<svg
						className="h-3 w-3 text-gray-900 dark:text-white -mt-1"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 2"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 1h16"
						/>
					</svg>
				</button>
				<input
					type="text"
					id="quantity-input"
					data-input-counter
					aria-describedby="helper-text-explanation"
					className="block h-7 w-full border border-gray-300
					bg-gray-50 py-2.5 text-center text-sm text-gray-900
					focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
					dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
					dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="1"
					value={quantity}
					required
				/>
				<button
					type="button"
					id="increment-button"
					data-input-counter-increment="quantity-input"
					className="h-7 rounded-e-lg border border-gray-300 
					bg-gray-300 p-3 hover:bg-gray-400 focus:outline-none 
					focus:ring-2 focus:ring-gray-100 dark:border-gray-600 
					dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
					onClick={increaseQuantity}
				>
					<svg
						className="h-3 w-3 text-gray-900 dark:text-white -mt-1"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 18"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 1v16M1 9h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
