"use client";

import { List } from "@/components/List";
import { Details } from "@/components/Details";
import { useEffect, useReducer } from "react";

export interface User {
  id: number;
  name: string;
}

interface State {
  selectedId: number | null;
  users: User[] | null;
}

export type SetSelectedId = {
  type: "setSelectedId";
  payload: number | null;
};

type SetUsers = {
  type: "setUsers";
  payload: User[] | null;
};

type Action = SetSelectedId | SetUsers;

const LIST_URL =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json ";

async function loadUsers(): Promise<User[] | null> {
  return await fetch(LIST_URL)
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
      return { ...state, selectedId: action.payload };
    case "setUsers":
      return { ...state, users: action.payload };
    default:
      throw new Error();
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: null,
    users: [],
  });

  useEffect(() => {
    (async () => {
      const users = await loadUsers();
      dispatch({ type: "setUsers", payload: users });
    })();
  }, []);
  return (
    <>
      <List
        users={state.users}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Details />
    </>
  );
}
