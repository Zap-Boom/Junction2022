import React from "react";
import { Item } from "../types";
import CalEntry from "./calendarEntry";

type Props = {
  list: Item[];
};

const Calendar = (props: Props) => {
  const { list } = props;
  const title = "Toadays agenda";

  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold">{title}</h1>
      <p>Cook some yummers food</p>
      <div className="container">
        <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid text-blue-50">
          {list.map((i) => (
            <CalEntry key="i.title" item={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
