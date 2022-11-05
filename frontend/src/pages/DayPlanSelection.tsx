import React, { useEffect, useState } from "react";
import "../styles/global.css";
import Page from "../components/page";

const DayPlanSelection: React.FC = () => {
  const [stayingAtHome, setStayingAtHome] = useState(true);

  useEffect(() => {
    console.log("Staying at home: ", stayingAtHome);
  }, [stayingAtHome]);

  return (
    <Page title={"What's the plan for the day?"} gradientBg={false}>
      <div className="dayTypeContainer">
        <div>
          <img src="https://i.imgur.com/sM2HbvL.png" alt="button" />
        </div>
        <div>
          <br />
          {/* Pressing this will take you to the time input screen */}
          <button onClick={() => setStayingAtHome(false)}>
            <b>Out of home</b>
          </button>
        </div>
        <div>
          <img src="https://i.imgur.com/sM2HbvL.png" alt="button" />
        </div>
        <div>
          <br />
          {/* Pressing this will take you directly to the calendar view and give default active hours */}
          <button onClick={() => setStayingAtHome(true)}>
            <b>At home</b>
          </button>
        </div>
      </div>
    </Page>
  );
};

export default DayPlanSelection;
