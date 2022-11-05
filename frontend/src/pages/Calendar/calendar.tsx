import React from "react";
import { Item } from "../../types";
import CalEntry from "./calendarEntry";

type Props = {
  list: Item[];
};

const Calendar = (props: Props) => {
  const { list } = props;
  const chosenList = list.filter((i) => i.isChosen);
  return (
    <div>
      <div className="max-w-2xl mx-auto my-2">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <h1 className="pt-5 mb-2 text-2xl font-bold tracking-tight text-blue-800 pl-9">
            Todays agenda
          </h1>
          <div className="px-5">
            <div className="container">
              <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid text-blue-50">
                {chosenList.map((i) => (
                  <CalEntry key="i.title" item={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
