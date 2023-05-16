import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import LoginModal from "./modal/LoginModal";
import UserProvider from "./context/UserProvider";
import SignupModal from "./modal/SignupModal";
const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/menu",
			element: <MenuPage />,
		},
		{
			path: "/about",
			element: <AboutPage />,
		},
	]);
	return (
		<main className="w-full h-full">
			<UserProvider>
				<>
					<LoginModal />
					<SignupModal />
					<RouterProvider router={router} />
				</>
			</UserProvider>
		</main>
	);
};

export default App;
