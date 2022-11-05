import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const DayType: React.FC<{
  text: string;
  img: string;
}> = ({ text, img }) => {
  return (
    <div key={text}>
      <button
        onClick={() => {
          console.log("selected day type: ", text);
        }}
      >
        <div className="dayTypeContainer">
          <div>
            <img src={img} alt="Button" />
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
      <DayType text="Just a regular weekday" img="/images/rect1.png" />
      <DayType text="Just a regular off-work day" img="/images/rect2.png" />
      <DayType text="Hangover mode" img="/images/rect3.png" />
      <DayType text="Create a new schedule" img="/images/plus.png" />
    </Page>
  );
};

export default FrontPage;
