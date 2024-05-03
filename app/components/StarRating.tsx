import { FaStar } from "react-icons/fa";

type StarRatingProps = {
	rating: number;
};

export const StarRating = ({ rating }: StarRatingProps) => {
	const totalStars = 5;
	return (
		<div className="flex">
			{[...Array(totalStars)].map((_, index) => (
				<FaStar
					key={index}
					className={index < rating ? "text-[#FF5722]" : ""}
				/>
			))}
		</div>
	);
};
