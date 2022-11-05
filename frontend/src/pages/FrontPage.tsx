import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const FrontPage: React.FC = () => {
  return (
    <Page title={"Today's plan"}>
      <ul>
        <li>
          <b>
            <a>Just a regular view</a>
          </b>
        </li>
        <li>
          <b>
            <a>Just a regular off-work day</a>
          </b>
        </li>
        <li>
          <b>
            <a>Hangover mode</a>
          </b>
        </li>
        <li>
          <b>
            <a>Create a new schedule</a>
          </b>
        </li>
      </ul>
    </Page>
  );
};

export default FrontPage;
