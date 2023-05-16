import { FC } from "react";
interface HeaderProps {
	title: string;
	subHeader?: string;
}

const ModalHeader: FC<HeaderProps> = ({ title, subHeader }) => {
	return (
		<div className="gap-5 mb-5">
			<h2 className="font-semibold text-3xl text-black">{title}</h2>
			{subHeader && (
				<p className="font-normal text-sm text-gray-500">{subHeader}</p>
			)}
		</div>
	);
};

export default ModalHeader;
