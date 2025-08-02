import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AuthorPage from "./pages/AuthorPage";

function ScrollToHashElement() {
	const { hash } = useLocation();

	useEffect(() => {
		if (!hash) return;

		const scrollToHash = () => {
			const el = document.querySelector(hash);
			if (el) {
				const yOffset = -16;
				const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
				window.scrollTo({ top: y, behavior: "smooth" });
			}
		};

		// Wait a short delay in case element hasn't rendered yet
		const timeout = setTimeout(scrollToHash, 200);

		return () => clearTimeout(timeout);
	}, [hash]);

	return null;
}

function App() {
	return (
		<Router>
			<ScrollToHashElement />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/author/:id" element={<AuthorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
