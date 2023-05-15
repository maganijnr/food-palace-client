import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import LoginModal from "./modal/LoginModal";
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
			<LoginModal />
			<RouterProvider router={router} />
		</main>
	);
};

export default App;
