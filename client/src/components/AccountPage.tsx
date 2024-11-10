import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
	const { ready, user, setUser } = useContext(UserContext);
	const [redirect, setRedirect] = useState<string | null>(null);

	let { subpage } = useParams();

	if (subpage === undefined) {
		subpage = "profile";
	}

	async function logout() {
		try {
			const response = await fetch("http://localhost:3000/logout", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			alert("Logout successful!");
		} catch (error) {
			console.error("Error logging out:", error);
		}

		setUser(null);
		setRedirect("/login");
	}

	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to={"/login"} />;
	}

	function linkClasses(type: String | null = null) {
		let classes = "py-2 px-6";
		if (type === subpage) classes += " bg-primary text-white rounded-full";

		return classes;
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div>
			<nav className="w-full flex mt-8 gap-2 justify-center mb-8">
				<Link className={linkClasses("profile")} to={"/account"}>
					My profile
				</Link>
				<Link className={linkClasses("bookings")} to={"/account/bookings"}>
					My bookings
				</Link>
				<Link className={linkClasses("places")} to={"/account/places"}>
					My accomodations
				</Link>
			</nav>
			{subpage === "profile" && user && (
				<div className="text-center max-w-sm mt-2 mx-auto">
					Logged in as {user.name} ({user.email})<br />
					<button className="primary" onClick={logout}>
						Logout
					</button>
				</div>
			)}
			{subpage === "places" && <PlacesPage />}
		</div>
	);
}
