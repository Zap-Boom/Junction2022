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
  const [finalTodos, setFinalTodos] = useState<any[]>([]);
  const [view, setView] = useState("start");
  const [schedule, setSchedule] = useState<any[]>([]);

  async function callScheduleBackend() {
    await fetch("http://46.101.205.67:3001/schedule", {
      method: "POST",
    }).then(async () => {
      await fetch("http://46.101.205.67:3001/schedule")
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
        })
        .then(async () => {
          await fetch("http://46.101.205.67:3001/todos")
            .then((response) => response.json())
            .then((data) => {
              setTodos(data);
            });
        });
    });
  }

  useEffect(() => {
    // Hacky solution to make this list up to date
    if (view === "cal") {
      swapView(<Calendar data={appData} />);
    }
  }, [finalTodos]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await fetch("http://46.101.205.67:3001/schedule", {
        method: "POST",
      }).then(async () => {
        await fetch("http://46.101.205.67:3001/schedule")
          .then((response) => response.json())
          .then((data) => {
            setSchedule(data);
          })
          .then(async () => {
            await fetch("http://46.101.205.67:3001/todos")
              .then((response) => response.json())
              .then((data) => {
                setFinalTodos(data);
              });
          });
      });
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [todos]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await callScheduleBackend();
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const appData = mergeData(todos, schedule);

  const handleContinueClick = async () => {
    switch (view) {
      case "start":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection data={appData} />);
        break;
      case "dayActivitySelection":
        setView("cal");
        callScheduleBackend();
        swapView(<Calendar data={appData} />);
        break;
    }
  };

  const handleBackClick = () => {
    switch (view) {
      case "cal":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection data={appData} />);
        break;
      case "dayPlanSelection":
        setView("dayActivitySelection");
        swapView(<DayActivitySelection data={appData} />);
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
