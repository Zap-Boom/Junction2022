import React, {useEffect, useState} from "react";
import Calendar from "./components/calendar";
import TodoList from "./components/todoList";
import "./styles/global.css";
import { Item } from "./types";
import FrontPage from "./pages/FrontPage";
import DayActivitySelection from "./pages/DayActivitySelection";

const App: React.FC = () => {

    const [todos, setTodos] = useState<any[]>([]);

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
          fetch('http://localhost:3001/todos')
              .then((response) => response.json())
              .then((data) => {
                  setTodos(data);
              });
      },
      [])

    useEffect(() => {
            console.log("todos lol: ", todos);
        },
        [todos])


  return (
    <div>
        <FrontPage />
        <DayActivitySelection todos={todos} />
      <p className="text-sm font-medium text-orange-200">Hello, yall</p>
      <TodoList list={dummyList} />
      <Calendar list={dummyList} />
    </div>
  );
};

export default App;
