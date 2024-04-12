"use client";

import type { IconType } from "react-icons";
import type React from "react";

interface ButtonProps {
	label: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
	type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	type,
	icon: Icon,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-[2px]
        hover:opacity-80
        hover:shadow-md
        focus:outline-none
        active:shadow-xs
        transition
        w-full
        ${outline ? "bg-white" : "bg-[#fb5533]"}
        ${outline ? "border-[#ee4d2d]" : "border-[#fb5533]"}
        ${outline ? "text-[#ee4d2d]" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
		>
			{Icon && <Icon size={24} className="absolute left-4 top-3" />}
			{label}
		</button>
	);
};

export default Button;
