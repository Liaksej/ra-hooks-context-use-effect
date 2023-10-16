import { SetSelectedId, User } from "@/app/page";
import { Dispatch, MouseEvent } from "react";

interface ListProps {
  users: User[] | null;
  selectedId: number | null;
  dispatch: Dispatch<SetSelectedId>;
}

export const List = ({ users, dispatch, selectedId }: ListProps) => {
  function selectHandler(event: MouseEvent<HTMLElement>, id: number) {
    if (selectedId === id) {
      return;
    }
    dispatch({ type: "setSelectedId", payload: id });
    if (
      event.currentTarget.parentNode &&
      event.currentTarget.parentNode.childNodes
    ) {
      Array.from(event.currentTarget.parentNode.childNodes).forEach((node) => {
        (node as HTMLElement).style.backgroundColor = "";
      });
    }
    event.currentTarget.style.backgroundColor = "blue";
  }

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id} onClick={(event) => selectHandler(event, user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};
