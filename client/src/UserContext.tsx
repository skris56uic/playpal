import { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
	_id: String;
	name: String;
	email: String;
	password: String;
	__v: Number;
}

export interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	ready: Boolean;
}

interface UserContextProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
	ready: false,
});

export function UserContextProvider({ children }: UserContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [ready, setReady] = useState<Boolean>(false);

	useEffect(() => {
		const fetchProfile = async () => {
			if (!user) {
				try {
					const response = await fetch("http://localhost:3000/profile", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					});

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const data = await response.json();

					setUser(data);
					setReady(true);
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};

		fetchProfile();
	}, []);

	return <UserContext.Provider value={{ user, setUser, ready }}>{children}</UserContext.Provider>;
}
