import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";

function RegisterPage() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function registerUser(e: FormEvent) {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Registration successful!");
			} else {
				alert(data.message || "Registration failed!");
			}
		} catch (error) {
			console.error("Error registering user:", error);
			alert("An error occurred. Please try again later.");
		}
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registerUser}>
					<input type="text" placeholder={"John Doe"} value={name} onChange={(e) => setName(e.target.value)} />
					<input type="email" placeholder={"your@email.com"} value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="password" placeholder={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
					<button className="primary">Register</button>
					<div className="text-center py-2 text-gray-500">
						Already a member?{" "}
						<Link to={"/login"} className="underline text-black">
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
