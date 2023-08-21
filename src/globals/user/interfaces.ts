import {type UseMutateFunction} from "react-query";

export type User = {
  id: number;
  name: string;
  last_seen_at: string;
};

export type UserContextType = {
  user?: User;
  isLoading: boolean;
  error: Error | null;
  login: UseMutateFunction<User, Error, number, unknown>;
  users: User[];
  isLoggedIn: boolean;
  logout: () => void;
};
