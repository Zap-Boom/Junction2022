import React, { useEffect, useState } from "react";
import "../styles/global.css";
import Page from "../components/page";

const ActivityComponent: React.FC<{
  text: string;
  id: string;
  level?: string;
}> = ({ text, id, level }) => {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    // selectOption(id, selected);
    const body = {
      isChosen: selected,
    };

    if (selected) {
      document.getElementById(`${id}_main`)?.classList.add("todoSelected");
    } else {
      document.getElementById(`${id}_main`)?.classList.remove("todoSelected");
    }
    const consumptionLevels: string[] = ["LOW", "MEDIUM", "HIGH"];
    consumptionLevels.forEach((consumptionLevel) => {
      document
        .getElementById(`${consumptionLevel}_${id}`)
        ?.classList.remove("btnSelected");
    });
    document.getElementById(`${level}_${id}`)?.classList.add("btnSelected");

    // TODO: Change this to a PUT
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }, [selected]);

  async function updateConsumptionLevel(consumptionLevel: string, e: any) {
    const body = {
      level: consumptionLevel,
    };
    const consumptionLevels: string[] = ["LOW", "MEDIUM", "HIGH"];
    consumptionLevels.forEach((consumptionLevel) => {
      document
        .getElementById(`${consumptionLevel}_${id}`)
        ?.classList.remove("btnSelected");
    });
    e.target.classList.add("btnSelected");

    // TODO: Change this to a PUT
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  let imgSrc = "";
  let showText = text;
  switch (text) {
    case "Do laundry":
      imgSrc = "/images/activities/laundry.png";
      showText = "Do laundry";
      break;
    case "Run the dryer":
      showText = "Use a clothes dryer";
      imgSrc = "/images/activities/laundry.png";
      break;
    case "Brew some coffee":
      imgSrc = "/images/activities/coffee.png";
      break;
    case "Cook some dinner":
      imgSrc = "/images/activities/cook.png";
      break;
    case "Charge the car":
      showText = "Charge an electric car";
      imgSrc = "/images/activities/car.png";
      break;
    case "Sauna":
      showText = "Go to the sauna";
      imgSrc = "/images/activities/sauna.png";
      break;
    case "Do the dishes":
      showText = "Use the diswasher";
      imgSrc = "/images/activities/dishes.png";
      break;
    case "Watch some TV":
      imgSrc = "/images/activities/tv.png";
      break;
    case "Floor Heating":
      showText = "Use the floor heating";
      imgSrc = "/images/activities/heating.png";
      break;
  }

  return (
    <div id={`${id}_main`} key={text} className="p-2 m-2">
      <button
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <div className="dayTypeContainer">
          <div>
            <img src={imgSrc} alt="Button" width={100} />
          </div>
          <div>
            <br />
            <b>{text}</b>
          </div>
        </div>
      </button>
      {selected ? (
        <div>
          <div className="electricityConsumptionButtonContainer">
            Select the electricity consumption estimation:
            <br />
            <button
              id={"LOW_" + id}
              onClick={(e: any) => {
                updateConsumptionLevel("LOW", e);
              }}
              className="electricityConsumptionButton btnGreen"
            >
              Low
            </button>
            <button
              id={"MEDIUM_" + id}
              onClick={(e: any) => {
                updateConsumptionLevel("MEDIUM", e);
              }}
              className="electricityConsumptionButton btnYellow btnSelected"
            >
              Medium
            </button>
            <button
              id={"HIGH_" + id}
              onClick={(e: any) => {
                updateConsumptionLevel("HIGH", e);
              }}
              className="electricityConsumptionButton btnRed"
            >
              High
            </button>
          </div>
          {text === "Laundry" ? (
            <i>
              Tip: select low if you have a small amount of clothes and a low
              temperature, high if you planning to wash in 90 C.
            </i>
          ) : null}
        </div>
      ) : null}
      <br />
    </div>
  );
};

const DayActivitySelection: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <Page title={"Today I want to"} gradientBg={false}>
      <div>
        {data.map((todo) => {
          return (
            <ActivityComponent
              level={todo.level}
              id={todo._id}
              text={todo.name}
              key={todo.name}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default DayActivitySelection;
