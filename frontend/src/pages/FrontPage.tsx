import React from "react";
import "../styles/global.css";
import Page from "../components/page";

const FrontPage: React.FC = () => {
    return (
        <Page title={"Today's plan"}>
            <ul>
                <li><a>Just a regular view</a></li>
                <li><a>Just a regular off-work day</a></li>
                <li><a>Hangover mode</a></li>
                <li><a>Create a new schedule</a></li>
            </ul>
        </Page>
    );
};

export default FrontPage;
