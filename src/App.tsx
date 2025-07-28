import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorPage from "./pages/AuthorPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/author/:id" element={<AuthorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
