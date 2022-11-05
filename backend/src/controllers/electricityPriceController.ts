import {
    addHours,
    isSameDay,
    isSameHour,
    setMilliseconds,
    setMinutes,
    setSeconds,
} from "date-fns"
import {ElectricityPrice, IElectrictyPrice, Todo} from "../schemas"
import { db } from "../app"

export const createMockData = async () => {
    // db.collection('electricityprices');
    await db.collection("electricityprices").deleteMany({})
    let curDate = setMinutes(new Date(), 0)
    curDate = setSeconds(curDate, 0)
    curDate = setMilliseconds(curDate, 0)
    const after24hrs = addHours(curDate, 24)
    let elPriceVal: number | null = null
    let isRunning: boolean = true
    const eurCentkWhArr: IElectrictyPrice[] = []
    while (isRunning) {
        elPriceVal = getRandomeurCentkWH(elPriceVal)
        curDate = addHours(curDate, 1)
        if (isSameDay(curDate, after24hrs) && isSameHour(curDate, after24hrs)) {
            isRunning = false
        }
        const newVal: IElectrictyPrice = new ElectricityPrice({
            startDate: curDate,
            endDate: addHours(curDate, 1),
            eurCentkWh: elPriceVal,
        })
        eurCentkWhArr.push(newVal)
    }

    ElectricityPrice.insertMany(eurCentkWhArr)
        .then((res) => {
            console.log(
                "Inserted electricity prices for the following 24 hours!"
            )
        })
        .catch((err) => {
            console.error(err)
        })
}

/**
 * Gets a random €cent/kWH value depending on the previous value
 * @param previousVal
 */
const getRandomeurCentkWH = (previousVal: number | null): number => {
    let res: number
    let min: number = 1
    let max: number = 99
    if (previousVal == null) {
        res = Math.random() * (max - min) + min
    } else {
        min = previousVal - 10 > 1 ? previousVal - 10 : 1
        max = previousVal + 10 < 99 ? previousVal + 10 : 99
        res = Math.random() * (max - min) + min
    }
    return Math.floor(res)
}

export const getElectricityPrices = async () => {
    return await ElectricityPrice.find({}).then((res) => {
        return res
    })
}
