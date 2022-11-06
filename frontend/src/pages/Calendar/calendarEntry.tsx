import React from "react";

type Props = {
  item: any;
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
      <div className="min-w-full col-start-2 col-end-10 p-4 my-4 mr-auto bg-blue-500 shadow-md rounded-xl">
        <h3 className="mb-1 text-lg font-semibold">
          {item.taskStart.split("T")[1].split(".")[0]} -{" "}
          {item.taskEnd.split("T")[1].split(".")[0]}
        </h3>
        <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
        <p className="mb-1 text-sm">The average for this timeslot is kWh/€ is 0.{item.price}kWh/€</p>
      </div>
    </div>
  );
};

export default CalEntry;
