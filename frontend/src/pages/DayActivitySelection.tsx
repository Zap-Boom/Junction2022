import React, {useEffect, useState} from "react";
import "../styles/global.css";
import Page from "../components/page";

const ActivityComponent: React.FC<{ text: string, selectOption: any, id: string }> = ({ text, selectOption, id }) => {

    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() =>{
        selectOption(id, selected);
    }, [selected]);

    return (
        <div key={text}>
            <button onClick={() => {
                setSelected(!selected)
            }}>
                <div>
                    {text}
                </div>
            </button>
            { selected ?
                <div>
                    Select the electricity consumption estimation:
                    <button>Low</button>
                    <button>Medium</button>
                    <button>High</button>
                </div>
            : null }
            <br />
            <br />
        </div>
    );
};

const DayActivitySelection: React.FC = () => {
    // Store users selected activities in an array for testing now
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

    function selectOption(option: string, selected: boolean) {
        // TODO: Make these call an endpoint instead
        console.log("selected option " + option + " as " + selected );
        if(selected){
            if(!selectedActivities.includes(option)){
                setSelectedActivities([...selectedActivities, option])
            }
        } else {
            if(selectedActivities.includes(option)){
                const selectedActivitiesWithoutOption = selectedActivities.filter(function (selectedOption) {
                    return selectedOption !== option;
                });
                setSelectedActivities(selectedActivitiesWithoutOption);
            }
        }
    }

    console.log("selected activities: ", selectedActivities);



    return (
        <Page title={"Today I want to"}>
            <ActivityComponent text={"Do the laundry"} selectOption={selectOption} id={"laundry"}/>
            <ActivityComponent text={"Dry clothes using a dryer"} selectOption={selectOption} id={"dryer"}/>
            <ActivityComponent text={"Warm a sauna"} selectOption={selectOption} id={"sauna"}/>
            <ActivityComponent text={"Charge an electric car"} selectOption={selectOption} id={"car"}/>
            <ActivityComponent text={"Cook food in the oven"} selectOption={selectOption} id={"oven"}/>
            <ActivityComponent text={"Make coffee"} selectOption={selectOption} id={"coffee"}/>
            <ActivityComponent text={"Add a custom type"} selectOption={selectOption} id={"custom"}/>
        </Page>
    );
};

export default DayActivitySelection;
