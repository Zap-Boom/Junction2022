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

  return (
    <div key={text}>
      <button
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <div className="dayTypeContainer">
          <div>
            <img src="https://i.imgur.com/rA5XE67.png" alt="Button" />
          </div>
          <div>
            <br />
            <b>{text}</b>
          </div>
        </div>
      </button>
      {selected ? (
        <div>
          Select the electricity consumption estimation:
          <br />
          <button>Low</button> &nbsp; - &nbsp;
          <button>Medium</button> &nbsp; - &nbsp;
          <button>High</button> &nbsp;
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
