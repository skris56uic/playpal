import { Link, Navigate } from "react-router-dom";
import { useState, FormEvent, useContext } from "react";
import { UserContext } from "../UserContext";

function LoginPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [redirect, setRedirect] = useState<boolean>(false);
	const { setUser } = useContext(UserContext);

	async function loginUser(e: FormEvent) {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (response.ok) {
				const userDocument = await response.json();
				setUser(userDocument);
				alert("Login successful!");
				setRedirect(true);
			} else {
				alert("Login failed!");
			}
		} catch (error) {
			console.error("Error Logging in user:", error);
			alert("An error occurred. Please try again later.");
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={loginUser}>
					<input type="email" placeholder={"your@email.com"} value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="password" placeholder={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{" "}
						<Link to={"/register"} className="underline text-black">
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
