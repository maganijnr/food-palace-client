import { ReactElement } from "react";
import Modal from "./Modal";
import useLoginModal from "../hooks/modalHooks/useLoginModal";

const LoginModal = () => {
	const loginModal = useLoginModal();
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	let bodyContent: ReactElement = (
		<div>
			<h2>Hello user</h2>
		</div>
	);
	return (
		<>
			<Modal
				isOpen={loginModal.isOpen}
				onClose={loginModal.onClose}
				body={bodyContent}
				className="translate mx-auto overflow-y-scroll h-full max-h-[70%] lg:h-auto md:h-auto md:min-h-[440px] border-0 rounded-t-[20px] md:rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:max-w-[484px]"
			/>
		</>
	);
};

export default LoginModal;
