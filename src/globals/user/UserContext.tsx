import {createContext, useContext, useMemo} from "react";
import type {User, UserContextType} from "./interfaces";
import {useMutation, useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import apiClient from "../config/apiClient";

function login(userId: number): Promise<User> {
  return apiClient
    .get(`/user/${userId}`)
    .then(({data}) => data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message: "Login error, please try again later",
      };
      throw error;
    });
}

function fetchUsers(): Promise<User[]> {
  return apiClient
    .get("user")
    .then(({data}) => data.data)
    .catch(({response}) => {
      const error: Error = {
        name: `${response.status as string} error`,
        message: "Error fetching users, please try again later",
      };
      throw error;
    });
}

const UserContext = createContext<UserContextType>(
  {} as unknown as UserContextType,
);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();

  const isLoggedIn = useMemo(() => {
    return Boolean(localStorage.getItem("isLoggedId"));
  }, []);

  const {data: users, isLoading} = useQuery(["users"], fetchUsers);

  const loginMutation = useMutation<User, Error, number>(
    ["login"],
    (userId) => login(userId),
    {
      onSuccess: () => {
        navigate("/conversations");
        localStorage.setItem("isLoggedId", "true");
      },
    },
  );

  const contextValue = useMemo(() => {
    return {
      user: {
        id: 1,
        name: "wessel",
        last_seen_at: "2023-07-25T16:12:44.000000Z",
      },
      users: users ?? [],
      isLoading: loginMutation.isLoading || isLoading,
      error: loginMutation.error,
      login: loginMutation.mutate,
      isLoggedIn,
    };
  }, [loginMutation.isLoading, loginMutation.data, users, isLoading]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  return useContext(UserContext);
}
