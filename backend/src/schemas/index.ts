import mongoose, { model, Model, Schema } from "mongoose"

export interface ITodo {
    name: string // name of task
    level: String // consumption level
    duration: number // the time it takes for the task, minutes
    isChosen: boolean // if false, item will not be scheduled
    startHour: number // following 4 fields are to limit when the item should be scheduled
    startMinute: number
    endHour: number
    endMinute: number
    isBlocking: boolean
    isHeating: boolean
}

export interface IScheduleItem {
    name: string
    startDate: Date
    endDate: Date
    level?: string
    type: string
}

export interface IElectrictyPrice {
    startDate: Date
    endDate: Date
    eurCentkWh: number
}

export interface IOutsideHours {
    startDate: Date
    endDate: Date
}

export const TodoSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true, enum: ["LOW", "MEDIUM", "HIGH"] },
    duration: { type: Number, maxlength: 3, required: true }, // duration in minutes,
    isChosen: { type: Boolean, required: true },
    startHour: { type: Number, required: true, maxlength: 2 },
    startMinute: { type: Number, required: true, maxlength: 2 },
    endHour: { type: Number, required: true, maxlength: 2 },
    endMinute: { type: Number, required: true, maxlength: 2 },
    isBlocking: { type: Boolean },
    isHeating: { type: Boolean },
})

export const ScheduleItemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: { type: String, enum: ["CALENDAR_ENTRY", "TODO_ENTRY"] },
    level: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
})

export const ElectricityPriceSchema: Schema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eurCentkWh: { type: Number, required: true },
})

export const OutsideHoursSchema: Schema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
})

export const Todo: Model<ITodo> = model<ITodo>("Todo", TodoSchema)
export const ScheduleItem: Model<IScheduleItem> = model<IScheduleItem>(
    "ScheduleItem",
    ScheduleItemSchema
)
export const ElectricityPrice: Model<IElectrictyPrice> =
    model<IElectrictyPrice>("ElectricityPrice", ElectricityPriceSchema)
export const OutsideHours: Model<IOutsideHours> = model<IOutsideHours>(
    "OutsideHours",
    OutsideHoursSchema
)
