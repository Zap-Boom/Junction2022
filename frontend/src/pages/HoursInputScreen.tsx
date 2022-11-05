import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const HoursInputScreen: React.FC = () => {
  return (
    <Page title={"Going out for the day, huh?"} gradientBg={false}>
      <div className="dayTypeContainer">
        <div>
          <img src="https://i.imgur.com/sM2HbvL.png" alt="button" />
        </div>
        <div>
          <br />
          <p>I will leave home at</p>
        </div>
        <div>
          <img src="https://i.imgur.com/sM2HbvL.png" alt="button" />
        </div>
        <div>
          <br />
          <p>I will return home at</p>
        </div>
      </div>
    </Page>
  );
};

export default HoursInputScreen;
