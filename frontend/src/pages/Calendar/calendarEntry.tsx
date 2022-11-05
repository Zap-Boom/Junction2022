import React from "react";
import { Item } from "../../types";

type Props = {
  item: Item;
};

const CalEntry = (props: Props) => {
  const { item } = props;
  return (
    <div className="flex md:contents">
      <div className="relative md:mx-auto">
        <div className="flex items-center justify-center w-6 h-full ">
          <div className="w-1 h-full bg-blue-800 pointer-events-none"></div>
        </div>
        <div className="absolute w-6 h-6 -mt-3 bg-blue-500 rounded-full shadow top-1/2"></div>
      </div>
      <div className="col-start-2 col-end-10 p-4 my-4 mr-auto bg-blue-500 border shadow-md rounded-xl">
        <h3 className="mb-1 text-lg font-semibold">
          {item.startHour > 10 ? item.startHour : `0${item.startHour}`}:
          {item.startMinute < 10 ? `0${item.startMinute}` : item.startMinute} -{" "}
          {item.endHour > 10 ? item.endHour : `0${item.endHour}`}:
          {item.endMinute < 10 ? `0${item.endMinute}` : item.endMinute} -{" "}
          {item.name}
        </h3>
      </div>
    </div>
  );
};

export default CalEntry;
