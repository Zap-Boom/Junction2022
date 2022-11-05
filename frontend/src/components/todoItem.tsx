import React from "react";
import { Item } from "../types";

type Props = {
  item: Item;
};

const TodoItem = (props: Props) => {
  const { item } = props;
  return (
    <div className="flex items-start items-center mb-2.5 px-5">
      <input
        id="checkbox-2"
        aria-describedby="checkbox-2"
        type="checkbox"
        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
      />
      <label
        htmlFor="checkbox-2"
        className="ml-3 text-lg font-medium text-gray-900"
      >
        {item.title}
      </label>
    </div>
  );
};

export default TodoItem;
