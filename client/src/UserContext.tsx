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
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
