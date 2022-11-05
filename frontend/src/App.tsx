import React from "react";
import Calendar from "./components/calendar";
import TodoList from "./components/todoList";
import "./styles/global.css";
import { Item } from "./types";

const App: React.FC = () => {
  const dummyList: Item[] = [
    {
      title: "list item 1",
    },
    {
      title: "list item 2",
    },
    {
      title: "list item 3",
    },
  ];
  return (
    <div>
      <p className="text-sm font-medium text-orange-200">Hello, yall</p>
      <TodoList list={dummyList} />
      <Calendar />
    </div>
  );
};

export default App;
