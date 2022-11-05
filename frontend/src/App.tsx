import React, { useEffect, useState } from "react";
import Calendar from "./pages/Calendar/calendar";
import { mergeData, swapView } from "./utils";
import DayActivitySelection from "./pages/DayActivitySelection";
import DayPlanSelection from "./pages/DayPlanSelection";
import FrontPage from "./pages/FrontPage";

import "./styles/global.css";
import HoursInputScreen from "./pages/HoursInputScreen";

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [view, setView] = useState("start");
  const [schedule, setSchedule] = useState<any[]>([]);
  // const [view, setView] = useState("dayActivitySelection");
  // const [stayingAtHome, setStayingAtHome] = useState(true);

  // function changeStayingAtHome(stayingAtHomeState: boolean) {
  //   console.log("asd");
  //   setStayingAtHome(stayingAtHomeState);
  // }

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });

    fetch("http://localhost:3001/schedule", {
      method: "POST",
    }).then((response) => response.json());

    fetch("http://localhost:3001/schedule")
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
      });
  }, []);

  const appData = mergeData(todos, schedule);
  console.log(appData);

  const handleContinueClick = () => {
    switch (view) {
      case "start":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection todos={todos} />);
        break;
      case "dayActivitySelection":
        setView("cal");
        swapView(<Calendar list={todos} />);
        // setView("dayPlanSelection");
        // swapView(<DayPlanSelection />);
        break;
      // case "dayPlanSelection":
      //   setView("hoursInputScreen");
      //   swapView(<HoursInputScreen />);
      //   break;
      // case "dayPlanSelection":
      //   setView("cal");
      //   swapView(<Calendar list={todos} />);
      //   break;
      // case "hoursInputScreen":
      //   setView("cal");
      //   swapView(<Calendar list={todos} />);
      //   break;
    }
  };

  const handleBackClick = () => {
    switch (view) {
      case "cal":
        //   setView("hoursInputScreen");
        //   swapView(<HoursInputScreen />);
        //   break;
        // case "hoursInputScreen":
        // setView("dayPlanSelection");
        // swapView(<DayPlanSelection />);
        setView("dayActivitySelection");
        swapView(<DayActivitySelection todos={todos} />);
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
        {/* <DayActivitySelection todos={todos} /> */}
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
