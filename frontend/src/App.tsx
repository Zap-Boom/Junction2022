import React, { useEffect, useState } from "react";
import Calendar from "./components/calendar";
import { swapView } from "./components/utils";
import "./styles/global.css";
import { Item } from "./types";
import FrontPage from "./pages/FrontPage";
import DayActivitySelection from "./pages/DayActivitySelection";
import DayPlanSelection from "./pages/DayPlanSelection";

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [view, setView] = useState("start");

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

  useEffect(() => {
    console.log("Fetching options from API");
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const handleContinueClick = () => {
    switch (view) {
      case "start":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection todos={todos} />);
        break;
      case "dayActivitySelection":
        setView("dayPlanSelection");
        swapView(<DayPlanSelection />);
        break;
      case "dayPlanSelection":
        setView("cal");
        swapView(<Calendar list={dummyList} />);
        break;
    }
  };

  const handleBackClick = () => {
    switch (view) {
      case "cal":
        setView("dayPlanSelection");
        swapView(<DayPlanSelection />);
        break;
      case "dayPlanSelection":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection todos={todos} />);
        break;
      case "dayActivitySelection":
        setView("start");
        swapView(<FrontPage />);
        break;
    }
  };

  return (
    <div>
      <div id="view">
        <FrontPage />
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
