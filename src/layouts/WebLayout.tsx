import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
	children: ReactNode;
}

const WebLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="w-full h-full">
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default WebLayout;
