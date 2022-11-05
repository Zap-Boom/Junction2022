import React from "react";
import { Item } from "../types";

type Props = {
  item: Item;
};

const TodoItem = (props: Props) => {
  const { item } = props;
  return <li>{item.title}</li>;
};

export default TodoItem;
