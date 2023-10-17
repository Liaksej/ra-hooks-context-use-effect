"use client";

import { List } from "@/components/List";
import { Details } from "@/components/Details";
import { useEffect, useReducer } from "react";

export interface User {
  id: number;
  name: string;
}

export interface UserData {
  id: number;
  name: string;
  avatar: string;
  details: {
    city: string;
    company: string;
    position: string;
  };
}

interface State {
  selectedId: number | null;
  users: User[] | null;
  userData: UserData | null;
  isLoading: boolean;
}

export type SetSelectedId = {
  type: "setSelectedId";
  payload: number | null;
};

type SetUsers = {
  type: "setUsers";
  payload: User[] | null;
};

type setUserData = {
  type: "setUserData";
  payload: UserData | null;
};

type setLoading = {
  type: "setLoading";
  payload: boolean;
};
type Action = SetSelectedId | SetUsers | setUserData | setLoading;

const LIST_URL =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json";

const USER_DATA_URL = (id: number) => {
  return `https://raw.githubusercontent.com/netology-code/ra16-homeworks/ra-51/hooks-context/use-effect/data/${id}.json`;
};

async function loadData(url: string) {
  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setSelectedId":
      console.log("рендер");
      return { ...state, selectedId: action.payload };
    case "setUsers":
      return { ...state, users: action.payload };
    case "setUserData":
      return { ...state, userData: action.payload };
    case "setLoading":
      return { ...state, isLoading: action.payload };
    default:
      throw new Error();
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: null,
    userData: null,
    users: [],
    isLoading: false,
  });

  useEffect(() => {
    if (state.users?.length === 0) {
      (async () => {
        const users = await loadData(LIST_URL);
        dispatch({ type: "setUsers", payload: users });
      })();
    }
    if (state.selectedId !== null) {
      (async () => {
        dispatch({ type: "setLoading", payload: true });
        const user = await loadData(USER_DATA_URL(state.selectedId!));
        dispatch({ type: "setUserData", payload: user });
        dispatch({ type: "setLoading", payload: false });
      })();
    }
  }, [state.users, state.selectedId]);
  return (
    <div className="mx-auto flex justify-around">
      <List
        users={state.users}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Details userData={state.userData} isLoading={state.isLoading} />
    </div>
  );
}
