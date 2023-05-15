import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
	btnText: string;
	icon?: IconType;
	handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	btnText,
	icon: Icon,
	handleClick,
	disabled,
	outline,
	small,
}) => {
	return (
		<button
			className={`relative rounded-lg disabled:opacity-70 disabled:cursor-not-allowed transition hover:opacity-80 font-medium flex items-center  ${
				outline
					? "text-black bg-white border-black"
					: " text-white bg-orange-500 border-orange-500"
			} ${
				small
					? "py-1 px-2 text-sm border-[1px]"
					: "py-2 text-base border-[2px] px-5"
			}`}
			onClick={handleClick}
			disabled={disabled}
		>
			{Icon && <Icon size={24} className="mr-2" />}
			{btnText}
		</button>
	);
};

export default Button;
