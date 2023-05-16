import { FC, useState, useContext } from "react";
import { UserProps } from "../types/userTypes";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

interface Props {
	connectedUser: UserProps;
}

const ConnectedMenu: FC<Props> = ({ connectedUser }) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { setConnectedUser } = useContext(UserContext);

	const { avatar, name, role } = connectedUser;

	async function logOutUser() {
		try {
			await axios.get(
				`${import.meta.env.VITE_BACKEND_LOCAL_URL}/auth/logout`
			);

			localStorage.removeItem("foodPalaceUser");
			setConnectedUser(null);
			setIsMenuOpen(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex items-center space-x-3 relative">
			<img
				src={avatar}
				alt="avatar"
				className="W-10 h-10 rounded-full overflow-hidden"
			/>
			<h2 className="font-medium text-base">{name}</h2>
			{isMenuOpen ? (
				<FiX
					size={24}
					className="cursor-pointer"
					onClick={() => setIsMenuOpen(false)}
				/>
			) : (
				<FiAlignJustify
					size={24}
					className="cursor-pointer"
					onClick={() => setIsMenuOpen(true)}
				/>
			)}

			{isMenuOpen && (
				<div className="absolute top-12 right-0 w-[200px] py-1 px-3 rounded-lg border-[2px] border-black shadow-md bg-white flex flex-col space-y-2">
					<button className="w-full py-1 text-left flex items-center text-black font-medium">
						<CgProfile className="mr-2" />
						Profile
					</button>
					{role === "ADMIN" && (
						<button className="w-full py-1 text-left flex items-center text-black font-medium">
							<IoCloudUploadOutline className="mr-2" />
							Upload meal
						</button>
					)}
					<button
						className="w-full py-1 text-left flex items-center text-red-700 font-medium"
						onClick={logOutUser}
					>
						<BiLogIn className="mr-2" />
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default ConnectedMenu;
