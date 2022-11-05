import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const DayType: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <div key={text}>
      <button
        onClick={() => {
          console.log("selected day type: ", text);
        }}
      >
        <div className="dayTypeContainer">
          <div>
            <img src="https://i.imgur.com/Qmvwt8l.png" alt="Logo" />
          </div>
          <div>
            <br />
            <b>{text}</b>
          </div>
        </div>
      </button>
      <br />
    </div>
  );
};

const FrontPage: React.FC = () => {
  return (
    <Page title={"Today is..."} gradientBg>
      <DayType text="Just a regular weekday" />
      <DayType text="Just a regular off-work day" />
      <DayType text="Hangover mode" />
      <DayType text="Create a new schedule" />
    </Page>
  );
};

export default FrontPage;
