import React from "react";
import TodoItem from "./todoItem";
import { Item } from "../types";

type Props = {
  list: Item[];
};

const TodoList = (props: Props) => {
  const { list } = props;
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <h1 className="pt-5 pr-5 mb-2 text-2xl font-bold tracking-tight text-blue-800 pl-9">
            What would you like to get done today?
          </h1>
          <div className="px-5">
            <div className="container">
              <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid text-blue-50"></div>
              <div className="max-w-lg mx-auto">
                <fieldset className="mb-5">
                  <legend className="sr-only">Checkbox variants</legend>
                  {list.map((i) => (
                    <TodoItem key="i.title" item={i} />
                  ))}
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
