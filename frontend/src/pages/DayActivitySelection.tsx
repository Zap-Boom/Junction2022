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

interface ActivityDetails {
    name: string,
    link: string
}


const DayActivitySelection: React.FC<{todos: any[]}> = (todos) => {
    // Store users selected activities in an array for testing now
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    // const [activities, setActivities] = useState();

    useEffect(() => {
        todos.todos.map((todo) => {
            const newTodo = <div>
                <p>asd {todo.name}</p>
            </div>
            // setActivities([...activities, newTodo])
        })
    }, [])


    // localhost:3001

    function selectOption(option: string, selected: boolean) {
        // TODO: Make these call an endpoint instead
        console.log("selected option " + option + " as " + selected );
        if(selected){
            if(!selectedActivities.includes(option)){
                setSelectedActivities([...selectedActivities, option])
                fetch('http://localhost:3001')
                    // .then((response) => response.json())
                    .then((data) => console.log(data));
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
    console.log("todos in dayactivity:", todos)

    // const activities = todos.todos.map((todo) => {
    //     // eslint-disable-next-line react/jsx-key
    //    return <div>
    //         <p>asd {todo.name}</p>
    //     </div>
    // })
    //
    // // const links: Linkdetails[] = t("siteMetadata.menuLinks.links", { returnObjects: true });
    // const activities: JSX.Element[] = [];

    const activities: ActivityDetails[] = todos.todos;

    function GetActivities(todos: any){
        const activities = todos.map((todo: any) => {
            <p>asd</p>
        });
        return <div>{"asd"}{activities}</div>;
    }

    return (
        <Page title={"Today I want to"}>
            <div>
                {todos.todos.map((todo) => {
                    return (<p key={todo.name}>{todo.name}</p>)
                })}
            </div>

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
