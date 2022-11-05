import React, { useEffect, useState } from "react";
import "../styles/global.css";
import Page from "../components/page";

const ActivityComponent: React.FC<{
  text: string;
  selectOption: any;
  id: string;
}> = ({ text, selectOption, id }) => {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    selectOption(id, selected);
  }, [selected]);

  let imgSrc = "";
  switch (text) {
    case "Laundry":
    case "Dryer":
      imgSrc = "/images/activities/laundry.png";
      break;
    case "Make coffee":
      imgSrc = "/images/activities/coffee.png";
      break;
    case "Cook":
      break;
    case "Charge car":
      imgSrc = "/images/activities/car.png";
      break;
    case "Sauna":
      imgSrc = "/images/activities/sauna.png";
      break;
    case "Dishes":
      imgSrc = "/images/activities/dishes.png";
      break;
    case "Watch TV":
      break;
    case "Floor heating":
      break;
  }

  return (
    <div key={text}>
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
            <button className="electricityConsumptionButton btnGreen">
              Low
            </button>
            <button className="electricityConsumptionButton btnYellow btnSelected">
              Medium
            </button>
            <button className="electricityConsumptionButton btnRed">
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

const DayActivitySelection: React.FC<{ todos: any[] }> = (todos) => {
  // Store users selected activities in an array for testing now
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  function selectOption(option: string, selected: boolean) {
    // TODO: Make these call an endpoint instead
    console.log("selected option " + option + " as " + selected);
    if (selected) {
      if (!selectedActivities.includes(option)) {
        setSelectedActivities([...selectedActivities, option]);
        fetch("http://localhost:3001")
          // .then((response) => response.json())
          .then((data) => console.log(data));
      }
    } else {
      if (selectedActivities.includes(option)) {
        const selectedActivitiesWithoutOption = selectedActivities.filter(
          function (selectedOption) {
            return selectedOption !== option;
          }
        );
        setSelectedActivities(selectedActivitiesWithoutOption);
      }
    }
  }

  return (
    <Page title={"Today I want to"} gradientBg={false}>
      <div>
        {todos.todos.map((todo) => {
          return (
            <ActivityComponent
              id={todo.name}
              text={todo.name}
              key={todo.name}
              selectOption={selectOption}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default DayActivitySelection;
