import { getTodos } from "./todoController"
import {
    IElectrictyPrice,
    IOutsideHours,
    IScheduleItem,
    ITodo,
    ScheduleItem,
    Todo,
} from "../schemas"
import { getElectricityPrices } from "./electricityPriceController"
import { getOutsideHours } from "./outsideHoursController"
import _, { map } from "underscore"
import { Schema } from "mongoose"
import {
    setHours,
    setMinutes,
    addHours,
    addMinutes,
    setSeconds,
    setMilliseconds,
} from "date-fns"
import { db } from "../app"

interface ISchedulerResponse {
    remainingSlots: IElectrictyPrice[]
    todosToRemove: ITodo[]
}

export const getSchedule = async (): Promise<IScheduleItem[]> => {
    return await ScheduleItem.find({}).then((res) => {
        return res
    })
}

export const calculateSchedule = async () => {
    const todos: ITodo[] = await getTodos()
    const electricityPrices: IElectrictyPrice[] = await getElectricityPrices()
    const outsideHoursArr: IOutsideHours[] = await getOutsideHours()
    const outsideHours: IOutsideHours | null =
        outsideHoursArr.length > 0 ? outsideHoursArr[0] : null
    const sortedPrices = sortedElectricityPrices(electricityPrices)
    if (await db.collection("scheduleitems").find({}))
        await db.collection("scheduleitems").deleteMany({})
    let responseHighCons: ISchedulerResponse = await insertScheduleItems(
        todos,
        outsideHours,
        sortedPrices,
        "HIGH"
    )
    if (responseHighCons.remainingSlots.length > 0) {
        console.log(responseHighCons.remainingSlots.length)
        let responseMedCons: ISchedulerResponse = await insertScheduleItems(
            todos,
            outsideHours,
            responseHighCons.remainingSlots,
            "MEDIUM"
        )
        if (responseMedCons.remainingSlots.length > 0) {
            await insertScheduleItems(
                todos,
                outsideHours,
                responseMedCons.remainingSlots,
                "LOW"
            )
        }
    }
}

const sortedElectricityPrices = (
    input: IElectrictyPrice[]
): IElectrictyPrice[] => {
    return _.sortBy(input, "eurCentkWh")
}

const insertScheduleItems = async (
    todos: ITodo[],
    outsideHours: IOutsideHours | null,
    prices: IElectrictyPrice[],
    consumption: string
): Promise<ISchedulerResponse> => {
    const highConsumptionArr: ITodo[] = _.where(todos, {
        isChosen: true,
        level: consumption,
    })
    let scheduleItems: IScheduleItem[] = []
    let timeSlotsToRemove: Date[] = []
    highConsumptionArr.forEach((todo) => {
        let earliestAllowedTime = setHours(new Date(), todo.startHour)
        earliestAllowedTime = setMinutes(earliestAllowedTime, todo.startMinute)
        earliestAllowedTime = setSeconds(earliestAllowedTime, 0)
        earliestAllowedTime = setMilliseconds(earliestAllowedTime, 0)
        let latestAllowedTime = setHours(new Date(), todo.endHour)
        latestAllowedTime = setMinutes(latestAllowedTime, todo.endMinute)
        latestAllowedTime = setSeconds(latestAllowedTime, 0)
        latestAllowedTime = setMilliseconds(latestAllowedTime, 0)

        let matchingTimeslots: IElectrictyPrice[] = _.filter(
            prices,
            (price: IElectrictyPrice) => {
                return (
                    price.startDate >= earliestAllowedTime &&
                    price.endDate < latestAllowedTime &&
                    price.startDate >= new Date()
                )
            }
        )

        if (
            !todo.isHeating &&
            matchingTimeslots != null &&
            matchingTimeslots.length > 0
        ) {
            let totalkWh = 0
            let previousPrice: IElectrictyPrice | undefined =
                matchingTimeslots[0]
            let totalKnownSlots = 1
            for (let i = 0; i < todo.duration / 60; i++) {
                if (previousPrice != null) {
                    totalkWh += previousPrice.eurCentkWh
                    timeSlotsToRemove.push(previousPrice.startDate)
                    timeSlotsToRemove.forEach((timeSlot) => {
                        let index = _.findIndex(prices, { startDate: timeSlot })
                        prices.splice(index, 1)
                    })
                    previousPrice = _.findWhere(prices, {
                        startDate: addHours(previousPrice.startDate, 1),
                    })
                    totalKnownSlots++
                }
            }
            let avgkWh = totalkWh / totalKnownSlots
            let scheduleItem: IScheduleItem = new ScheduleItem({
                name: todo.name,
                startDate: matchingTimeslots[0].startDate,
                endDate: addMinutes(
                    matchingTimeslots[0].startDate,
                    todo.duration
                ),
                type: "TODO_ENTRY",
                level: todo.level,
                avgkWh,
            })
            scheduleItems.push(scheduleItem)
        }
    })
    if (scheduleItems.length > 0) {
        await db.collection("scheduleitems").insertMany(scheduleItems)
    }
    return {
        remainingSlots: prices,
        todosToRemove: highConsumptionArr,
    }
}
