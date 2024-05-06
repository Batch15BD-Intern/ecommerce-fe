import { FaStar } from "react-icons/fa";

type StarRatingProps = {
	rating: number;
	setRating: (arg0: number) => void;
};

export const StarRating = ({ rating, setRating }: StarRatingProps) => {
	const totalStars = 5;
	return (
		<div className="flex">
			{[...Array(totalStars)].map((_, index) => (
				<FaStar
					key={index}
					className={
						index < rating ? "text-[#FF5722] cursor-pointer" : "cursor-pointer"
					}
					onClick={() => setRating(index + 1)}
				/>
			))}
		</div>
	);
};
