import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const DayPlanSelection: React.FC = () => {
  return (
    <Page title={"What's the plan for the day?"} gradientBg={false}>
      <div>
        <button>Out of home</button>
        <br />
        <button>At home</button>
      </div>
    </Page>
  );
};

export default DayPlanSelection;
