import { getTodos } from "./todoController"
import {
    IElectrictyPrice,
    IOutsideHours,
    IScheduleItem,
    ITodo,
    ScheduleItem,
} from "../schemas"
import { getElectricityPrices } from "./electricityPriceController"
import { getOutsideHours } from "./outsideHoursController"
import _, { map } from "underscore"
import { Schema } from "mongoose"
import {
    setHours,
    setMinutes,
    isBefore,
    isAfter,
    isSameHour,
    addHours,
    isSameDay,
    addMinutes,
} from "date-fns"
import { start } from "repl"

interface ISchedulerResponse {
    occuppiedSlots: Schema.Types.ObjectId[]
    todosToRemove: ITodo[]
}

export const calculateSchedule = async () => {
    const todos: ITodo[] = await getTodos()
    const electricityPrices: IElectrictyPrice[] = await getElectricityPrices()
    const outsideHoursArr: IOutsideHours[] = await getOutsideHours()
    const outsideHours: IOutsideHours | null =
        outsideHoursArr.length > 0 ? outsideHoursArr[0] : null
    const sortedPrices = sortedElectricityPrices(electricityPrices)
    setHighPrioTodos(todos, outsideHours, sortedPrices)
}

const sortedElectricityPrices = (
    input: IElectrictyPrice[]
): IElectrictyPrice[] => {
    return _.sortBy(input, "eurCentkWh")
}

const setHighPrioTodos = (
    todos: ITodo[],
    outsideHours: IOutsideHours | null,
    prices: IElectrictyPrice[]
): ISchedulerResponse => {
    const occuppiedSlots: Schema.Types.ObjectId[] = []
    const highConsumptionArr: ITodo[] = _.where(todos, {
        level: "HIGH",
        isChosen: true,
    })
    highConsumptionArr.forEach((todo) => {
        let startTime = setHours(new Date(), todo.startHour)
        startTime = setMinutes(startTime, todo.startMinute)
        let endTime = setHours(new Date(), todo.endHour)
        endTime = setMinutes(endTime, todo.endMinute)
        let matchingTimeslots = _.filter(prices, (price: IElectrictyPrice) => {
            return price.startDate >= startTime && price.startDate < endTime
        })
        console.log("#########################################")
        // console.log(matchingTimeslots)
        if (!todo.isHeating && matchingTimeslots.length > 0) {
            let scheduleItem: IScheduleItem = new ScheduleItem({
                name: todo.name,
                startDate: matchingTimeslots[0].startDate,
                endDate: addMinutes(
                    matchingTimeslots[0].startDate,
                    todo.duration
                ),
                type: "TODO_ENTRY",
                level: todo.level,
            })
            console.log(startTime)
            console.log(endTime)
            // console.log(matchingTimeslots);
            console.log("scheduleItem", scheduleItem)
        }
    })

    return {
        occuppiedSlots: [],
        todosToRemove: highConsumptionArr,
    }
}
