import { FC, useCallback, useEffect, useState, ReactElement } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const ModalBody = styled.div`
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ModalContent = styled.div`
	&::-webkit-scrollbar {
		display: none;
	}
`;

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	body: ReactElement;
	footer?: ReactElement;
	disabled?: boolean;
	prevStep?: boolean;

	className?: string;
}

const Modal: FC<ModalProps> = ({
	isOpen,
	onClose,
	body,
	footer,
	className,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	if (!isOpen) {
		return null;
	}
	return (
		<div className="font-heading">
			<ModalBody className="fixed top-0 left-0 bg-black/70 z-[60] outline-none focus:outline-none inset-0 overflow-y-auto  overflow-x-hidden">
				<div className=" relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-5 mx-auto h-full lg:h-auto md:h-auto ">
					{/*Content*/}
					<div
						className={`translate duration-300 h-full flex items-end md:items-center md:pt-20 2xl:pt-32 fixed bottom-0 right-0 left-0 md:relative md:translate-y-50  ${
							showModal
								? "translate-y-0 opacity-100"
								: "translate-y-full opacity-0"
						}`}
					>
						<ModalContent
							className={
								className
									? className
									: "translate mx-auto overflow-y-scroll h-full max-h-[70%] lg:h-auto md:h-auto md:min-h-[440px] border-0 rounded-t-lg md:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:max-w-[580px]"
							}
						>
							{/*Header*/}
							<div className="w-full pt-[16px] px-[24px] flex items-center">
								<button
									className="flex items-center justify-center p-2 ml-auto"
									onClick={handleClose}
								>
									<IoMdClose fontSize={16} />
								</button>
							</div>
							{/*Body content*/}
							<div className="w-full pb-[10px] h-full">{body}</div>

							{/*Footer content*/}
							<div className="w-full relative mt-auto pb-[32px]">
								{footer}
							</div>
						</ModalContent>
					</div>
				</div>
			</ModalBody>
		</div>
	);
};

export default Modal;
