import {createContext, useContext, useMemo, useState} from "react";
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedId")),
  );

  // Should've use InfiniteQuery here
  const {data: users, isLoading} = useQuery(["users"], fetchUsers);

  const loginMutation = useMutation<User, Error, number>(
    ["login"],
    (userId) => login(userId),
    {
      onSuccess: () => {
        navigate("/conversations");
        localStorage.setItem("isLoggedId", "true");
      },
      onError: () => {
        navigate("/conversations");
        localStorage.setItem("isLoggedId", "true");
      }
    },
  );

  const contextValue = useMemo(() => {
    return {
      user: users?.[users.length - 1],
      users: users ?? [
        {
          id: 9,
          name: "wessel",
          last_seen_at: "2021-07-21T08:07:37.000000Z",
        },
        {
          id: 8,
          name: "nick",
          last_seen_at: "2021-06-17T16:06:11.000000Z",
        },
        {
          id: 7,
          name: "mdemaa",
          last_seen_at: "2021-07-03T06:06:11.000000Z",
        },
        {
          id: 6,
          name: "jordy",
          last_seen_at: "2021-06-24T10:06:11.000000Z",
        },
        {
          id: 5,
          name: "jesper",
          last_seen_at: "2021-07-19T08:06:11.000000Z",
        },
        {
          id: 4,
          name: "hilco",
          last_seen_at: "2021-06-15T01:06:11.000000Z",
        },
        {
          id: 3,
          name: "bram",
          last_seen_at: "2021-07-20T12:06:11.000000Z",
        },
        {
          id: 2,
          name: "andre",
          last_seen_at: "2021-06-27T22:06:11.000000Z",
        },
        {
          id: 1,
          name: "ali",
          last_seen_at: "2021-07-21T08:06:54.000000Z",
        },
      ],
      isLoading: loginMutation.isLoading || isLoading,
      error: loginMutation.error,
      login: loginMutation.mutate,
      isLoggedIn,
      logout: () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedId");
      },
    };
  }, [loginMutation.isLoading, loginMutation.data, users, isLoading]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  return useContext(UserContext);
}
