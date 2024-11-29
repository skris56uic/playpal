import { createContext, ReactNode } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
