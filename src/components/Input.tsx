import { FC } from "react";

interface InputProps {
	value: string;
	handleChange: (ev: any) => void;
	disabled?: boolean;
	type: string;
	name: string;
	label?: string;
	error?: string;
	placeHolder?: string;
	classStyles?: string;
}

const Input: FC<InputProps> = ({
	value,
	handleChange,
	disabled,
	name,
	type,
	label,
	error,
	placeHolder,
	classStyles,
}) => {
	return (
		<div className={`w-full flex flex-col ${classStyles} mx-auto`}>
			{label && (
				<label htmlFor={name} className="font-medium text-base mb-2">
					{label}
				</label>
			)}
			<input
				value={value}
				disabled={disabled}
				name={name}
				type={type}
				onChange={handleChange}
				placeholder={placeHolder}
				className="w-full h-[45px] border-[2px] rounded-lg border-black px-2 font-medium placeholder:text-gray-400 placeholder:font-medium outline-none hover:border-orange-500 focus:border-orange-500 duration-300 ease-out transition disabled:cursor-not-allowed disabled:opacity-70"
			/>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Input;
