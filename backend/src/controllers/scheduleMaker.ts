import {getTodos} from "./todoController";
import {IElectrictyPrice, IOutsideHours, ITodo} from "../schemas";
import {getElectricityPrices} from "./electricityPriceController";
import {getOutsideHours} from "./outsideHoursController";
import _, { map } from 'underscore'
import {Schema} from "mongoose";
import {setHours, setMinutes, isBefore, isAfter, isSameHour} from "date-fns";
import {start} from "repl";

interface ISchedulerResponse {
    occuppiedSlots: Schema.Types.ObjectId[],
    todosToRemove: ITodo[]
}

export const calculateSchedule = async () => {
    const todos: ITodo[] = await getTodos();
    const electricityPrices: IElectrictyPrice[] = await getElectricityPrices();
    const outsideHoursArr: IOutsideHours[] = await getOutsideHours();
    const outsideHours: IOutsideHours | null = outsideHoursArr.length > 0 ? outsideHoursArr[0] : null;
    const sortedPrices = sortedElectricityPrices(electricityPrices);
    setHighPrioTodos(todos, outsideHours, sortedPrices);
}

const sortedElectricityPrices = (input: IElectrictyPrice[]): IElectrictyPrice[] => {
    return _.sortBy(input, 'eurCentkWh');
}

const setHighPrioTodos = (todos: ITodo[], outsideHours: IOutsideHours | null, prices: IElectrictyPrice[], ) :ISchedulerResponse => {
    const occuppiedSlots: Schema.Types.ObjectId[] = [];
    const highConsumptionArr: ITodo[] = _.where(todos, {"level": "HIGH"});
    highConsumptionArr.forEach((todo) => {
        let startTime = setHours(new Date(), todo.startHour);
        startTime = setMinutes(startTime, todo.startMinute);
        let endTime = setHours(new Date(), todo.endHour);
        endTime = setMinutes(endTime, todo.endMinute);
        let matchingTimeslots = _.filter(prices, (price: IElectrictyPrice) => {
            return isAfter(price.startDate, startTime) || isSameHour(price.startDate, startTime)
        });
        console.log(matchingTimeslots);
    })

    return {
        occuppiedSlots: [],
        todosToRemove: highConsumptionArr
    }
}