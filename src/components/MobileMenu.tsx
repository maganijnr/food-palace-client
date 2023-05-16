import { NavLink } from "react-router-dom";
import { useContext, FC } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserProvider";
import Button from "./Button";
import useLoginModal from "../hooks/modalHooks/useLoginModal";
import useSignUpModal from "../hooks/modalHooks/useSignupModal";
import axios from "axios";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const MobileMenuDiv = styled.div`
	height: calc(100vh - 72px);
`;

interface MobileMenuProps {
	toggle: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ toggle }) => {
	const { connectedUser, setConnectedUser } = useContext(UserContext);
	const loginModal = useLoginModal();
	const signUpModal = useSignUpModal();

	function loginToggle() {
		toggle();
		loginModal.onOpen();
	}

	function signUpToggle() {
		toggle();
		signUpModal.onOpen();
	}

	async function logOutUser() {
		try {
			await axios.get(
				`${import.meta.env.VITE_BACKEND_LOCAL_URL}/auth/logout`
			);

			localStorage.removeItem("foodPalaceUser");
			setConnectedUser(null);
			toggle();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<MobileMenuDiv className="block absolute top-[72px] left-0 right-0 lg:hidden bg-white px-10 pt-10 z-[888]">
			<div className="w-[250px] mt-10 mx-auto">
				<div className="flex flex-col space-y-5">
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
				{connectedUser ? (
					<div className="flex flex-col space-y-5 mt-10">
						<div className="flex items-center space-x-3 relative">
							<img
								src={connectedUser?.avatar}
								alt="avatar"
								className="W-10 h-10 rounded-full overflow-hidden"
							/>
							<h2 className="font-medium text-base">
								{connectedUser?.name}
							</h2>
						</div>
						<div className="flex flex-col space-y-4">
							<button className="w-full py-1 text-left flex items-center text-black font-medium">
								<CgProfile className="mr-2" />
								Profile
							</button>
							<button
								className="w-full py-1 text-left flex items-center text-red-700 font-medium"
								onClick={logOutUser}
							>
								<BiLogIn className="mr-2" />
								Logout
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col space-y-5 mt-10">
						<Button
							btnText="Log in"
							outline={true}
							handleClick={loginToggle}
							type="button"
						/>
						<Button
							btnText="Sign up"
							type="button"
							handleClick={signUpToggle}
						/>
					</div>
				)}
			</div>
		</MobileMenuDiv>
	);
};

export default MobileMenu;
