import {
	ReactElement,
	useEffect,
	useState,
	useContext,
	useCallback,
} from "react";
import Modal from "./Modal";
import useLoginModal from "../hooks/modalHooks/useLoginModal";
import useSignUpModal from "../hooks/modalHooks/useSignupModal";
import Input from "../components/Input";
import ModalHeader from "../components/ModalHeader";
import { UserContext } from "../context/UserProvider";
import axios from "axios";
import Button from "../components/Button";

const SignupModal = () => {
	const loginModal = useLoginModal();
	const signUpModal = useSignUpModal();
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { setConnectedUser } = useContext(UserContext);

	useEffect(() => {
		if (errorMessage) {
			setTimeout(() => {
				setErrorMessage("");
			}, 5000);
		}
	}, [errorMessage]);

	const toggleModal = useCallback(() => {
		signUpModal.onClose();
		loginModal.onOpen();
	}, [loginModal, signUpModal]);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			if (!email || !password || !name) {
				return setErrorMessage("All fields are required.");
			}

			const userInfo = {
				name: name,
				email: email,
				password: password,
			};

			const result = await axios.post(
				`${import.meta.env.VITE_BACKEND_LOCAL_URL}/auth/signup`,
				userInfo
			);

			if (result?.data?.success) {
				localStorage.setItem(
					"foodPalaceUser",
					JSON.stringify({
						...result?.data?.user,
						token: result?.data?.token,
					})
				);
				setConnectedUser({
					...result?.data?.user,
					token: result?.data?.token,
				});
			}
			setIsLoading(false);
			signUpModal.onClose();
		} catch (error) {
			//@ts-ignore
			if (error && error.response.data && !error.response.data.success) {
				//@ts-ignore
				setErrorMessage(error.response.data.message);
			}

			setIsLoading(false);
		}
	};

	let bodyContent: ReactElement = (
		<div className="px-4 w-full">
			<ModalHeader
				title="Sign up"
				subHeader="Welcome to the family! Create an account to proceed"
			/>
			{errorMessage && (
				<p className="text-center text-red-500 font-normal ">
					{errorMessage}
				</p>
			)}
			<form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
				<Input
					value={name}
					handleChange={(e) => setName(e.target.value)}
					type="text"
					label="Full name"
					placeHolder="Enter your full name"
					name="name"
					disabled={isLoading ? true : false}
				/>
				<Input
					value={email}
					handleChange={(e) => setEmail(e.target.value)}
					type="email"
					label="Email"
					placeHolder="Enter your email address"
					name="email"
					disabled={isLoading ? true : false}
				/>

				<Input
					value={password}
					handleChange={(e) => setPassword(e.target.value)}
					type="password"
					label="Password"
					placeHolder="Enter your password"
					name="password"
					disabled={isLoading ? true : false}
				/>

				<Button
					btnText="Submit"
					type="submit"
					disabled={isLoading ? true : false}
				/>
			</form>
		</div>
	);

	let footerContent: ReactElement = (
		<div className="px-4 w-full text-center">
			<button
				type="button"
				className="text-orange-500 font-medium"
				onClick={toggleModal}
			>
				Already have an account? Click here
			</button>
		</div>
	);
	return (
		<>
			<Modal
				isOpen={signUpModal.isOpen}
				onClose={signUpModal.onClose}
				body={bodyContent}
				footer={footerContent}
				className="translate mx-auto overflow-y-scroll h-full max-h-[70%] lg:h-auto md:h-auto md:min-h-[440px] border-0 rounded-t-[20px] md:rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:max-w-[484px]"
			/>
		</>
	);
};

export default SignupModal;
