import React from "react";
import TodoItem from "./todoItem";
import { Item } from "../types";

type Props = {
  list: Item[];
};

const TodoList = (props: Props) => {
  const { list } = props;
  return (
    <ul>
      {list.map((i) => (
        <TodoItem key="i.title" item={i} />
      ))}
    </ul>
  );
};

export default TodoList;
