import React, { useEffect, useState } from "react";
import Calendar from "./pages/Calendar/calendar";
import { swapView } from "./components/utils";
import "./styles/global.css";
import FrontPage from "./pages/FrontPage";
import DayActivitySelection from "./pages/DayActivitySelection";
import DayPlanSelection from "./pages/DayPlanSelection";

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [view, setView] = useState("start");

  useEffect(() => {
    console.log("Fetching options from API");
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  console.log(typeof todos);
  console.log(todos);

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
        swapView(<Calendar list={todos} />);
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
    <div className="max-w-2xl mx-auto my-2">
      <div id="view">
        <FrontPage />
      </div>
      <button className="mx-5" onClick={() => handleBackClick()}>
        Back
      </button>
      <button className="mx-5" onClick={() => handleContinueClick()}>
        Continue
      </button>
    </div>
  );
};

export default App;
