import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const ActivityComponent: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div key={text}>
            <button onClick={() => console.log("uwu")}>
                <div>
                    {text}
                </div>
            </button>
            <br />
            <br />
        </div>
    );
};


const DayActivitySelection: React.FC = () => {
    return (
        <Page title={"Today I want to"}>
            <ActivityComponent text={"Do the laundry"} />
            <ActivityComponent text={"Dry clothes using a dryer"} />
            <ActivityComponent text={"Warm a sauna"} />
            <ActivityComponent text={"Charge an electric car"} />
            <ActivityComponent text={"Cook food in the oven"} />
            <ActivityComponent text={"Make coffee"} />
            <ActivityComponent text={"Add a custom type"} />
        </Page>
    );
};

export default DayActivitySelection;
