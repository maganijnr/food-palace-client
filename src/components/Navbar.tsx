import { useState } from "react";
import Logo from "../assets/logo/main-logo.svg";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import useLoginModal from "../hooks/modalHooks/useLoginModal";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const loginModal = useLoginModal();
	const toggle = () => setIsMenuOpen((prevState) => !prevState);

	return (
		<div className="w-full h-[70px] shadow-md sticky top-0 left-0">
			<div className="w-full h-full relative max-w-[1900px] mx-auto flex items-center justify-between px-5 py-1">
				<div className="w-[150px] h-10">
					<img src={Logo} alt="logo" className="w-full object-contain" />
				</div>

				<button
					className="outline-none border-none bg-transparent cursor-pointer block lg:hidden"
					onClick={toggle}
				>
					{isMenuOpen ? (
						<FiX fontSize={24} />
					) : (
						<FiAlignJustify fontSize={24} />
					)}
				</button>

				<div className="hidden lg:flex items-center space-x-5">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? "text-orange-500 font-medium text-xl"
								: "text-black font-medium text-xl hover:text-orange-500 duration-300 ease-in-out transition-colors"
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/menu"
						className={({ isActive }) =>
							isActive
								? "text-orange-500 font-medium text-xl"
								: "text-black font-medium text-xl hover:text-orange-500 duration-300 ease-in-out transition-colors"
						}
					>
						Menu
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive
								? "text-orange-500 font-medium text-xl"
								: "text-black font-medium text-xl hover:text-orange-500 duration-300 ease-in-out transition-colors"
						}
					>
						About us
					</NavLink>
				</div>

				<div className="hidden lg:flex items-center space-x-5">
					<Button
						btnText="Log in"
						outline={true}
						handleClick={loginModal.onOpen}
					/>
					<Button btnText="Sign up" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
