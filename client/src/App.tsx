import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./components/AccountPage";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/account/:subpage?" element={<AccountPage />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
