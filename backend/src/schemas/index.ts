import mongoose, {model, Model, Schema} from "mongoose"


export interface ITodo {
    name: string,
    kwh?: number,
    time: string
}

export interface IScheduleItem {
    name: string,
    happeningAt: Date,
    kwh?: number,
    type: string
}

export const TodoSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    kwh: { type: Number, maxlength: 5 },
    time: { type: String, maxlength: 5, required: true },
});

export const ScheduleItemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    happeningAt: { type: Date, required: true },
    type: { type: String, enum : ['CALENDAR_ENTRY','TODO_ENTRY']},
    kwh: { type: Number, maxlength: 5 }
});


export const Todo: Model<ITodo> = model<ITodo>('Todo', TodoSchema);
export const ScheduleItem: Model<IScheduleItem> = model<IScheduleItem>('ScheduleItem', ScheduleItemSchema);

