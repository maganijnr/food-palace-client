import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";

interface UserProps {
	id: string;
	createdAt?: string;
	name: string;
	email: string;
	password?: string | null;
	role: "USER" | "ADMIN";
	avatar: string;
	token: string;
}

export const UserContext = createContext<{
	connectedUser: UserProps | null;
	setConnectedUser: Dispatch<SetStateAction<UserProps | null>>;
}>({
	connectedUser: null,
	setConnectedUser: null as any,
});

const UserProvider = ({ children }: any) => {
	const [connectedUser, setConnectedUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const fecthLocalUser = () => {
			const savedUser = localStorage.getItem("foodPalaceUser")
				? //@ts-ignore
				  JSON.parse(localStorage.getItem("foodPalaceUser"))
				: null;

			//@ts-ignore
			setConnectedUser(savedUser);
		};

		fecthLocalUser();
	}, []);

	return (
		<UserContext.Provider
			value={{
				connectedUser: connectedUser,
				setConnectedUser: setConnectedUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
