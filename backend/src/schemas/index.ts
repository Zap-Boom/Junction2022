import mongoose, { model, Model, Schema } from "mongoose"

export interface ITodo {
    name: string
    level: String
    time: string
}

export interface IScheduleItem {
    name: string
    happeningAt: Date
    level?: String
    type: string
}

export interface IElectrictyPrice {
    startDate: Date
    endDate: Date
    eurCentkWh: number
}

export const TodoSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    time: { type: String, maxlength: 5, required: true },
})

export const ScheduleItemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    happeningAt: { type: Date, required: true },
    type: { type: String, enum: ["CALENDAR_ENTRY", "TODO_ENTRY"] },
    level: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], maxlength: 5 },
})

export const ElectricityPriceSchema: Schema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eurCentkWh: { type: Number, required: true },
})

export const Todo: Model<ITodo> = model<ITodo>("Todo", TodoSchema)
export const ScheduleItem: Model<IScheduleItem> = model<IScheduleItem>(
    "ScheduleItem",
    ScheduleItemSchema
)
export const ElectricityPrice: Model<IElectrictyPrice> =
    model<IElectrictyPrice>("ElectricityPrice", ElectricityPriceSchema)
