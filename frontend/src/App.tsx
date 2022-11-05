import React, { useState } from "react";
import Calendar from "./components/calendar";
import TodoList from "./components/todoList";
import { swapView } from "./components/utils";
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

  const [view, setView] = useState("start");

  const handleContinueClick = () => {
    switch (view) {
      case "start":
        setView("plan");
        swapView(<p>plan</p>);
        break;
      case "plan":
        setView("cal");
        swapView(<Calendar list={dummyList} />);
        break;
    }
  };
  const handleBackClick = () => {
    switch (view) {
      case "cal":
        setView("plan");
        swapView(<p>plan</p>);
        break;
      case "plan":
        setView("start");
        swapView(<TodoList list={dummyList} />);
        break;
    }
  };

  return (
    <div>
      <div id="view">
        <TodoList list={dummyList} />
      </div>
      <button className="mx-5" onClick={() => handleContinueClick()}>
        Continue
      </button>
      <button className="mx-5" onClick={() => handleBackClick()}>
        Back
      </button>
    </div>
  );
};

export default App;
