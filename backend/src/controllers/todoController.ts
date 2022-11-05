import {ElectricityPrice, ITodo, ITodoUpdateReq, Todo} from "../schemas"
import { parseISO, setHours } from "date-fns"
import { db } from "../app"
import { Schema } from "mongoose"

export const insertTodo = async (todo: ITodo) => {
    const todoItem = new Todo(todo)
    await todoItem.save()
}

export const insertDefaultTodos = async () => {
    await Todo.find({}).then(async (res) => {
        if (res != null && res.length === 0) await Todo.insertMany(defaultTodos());
    })
}

export const getTodos = async () => {
    return await Todo.find({}).then((res) => {
        return res
    })
}

export const updateTodos = async (id: string, fields: ITodoUpdateReq) => {
    return await Todo.findByIdAndUpdate(id, fields)
}

const defaultTodos = () => {
    const todoItems = []
    todoItems.push(
        new Todo({
            name: "Do laundry",
            level: "MEDIUM",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
            tip: 'Select low if you have a small amount of clothes and a low temperature, high if you planning to wash in 90 C.'
        }),
        new Todo({
            name: "Brew some coffee",
            level: "MEDIUM",
            duration: 30,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 12,
            endMinute: 0,
        }),
        new Todo({
            name: "Cook some dinner",
            level: "HIGH",
            duration: 60,
            isChosen: true,
            startHour: 16,
            startMinute: 0,
            endHour: 19,
            endMinute: 0,
        }),
        new Todo({
            name: "Charge the car",
            level: "HIGH",
            duration: 120,
            isChosen: true,
            startHour: 0,
            startMinute: 0,
            endHour: 23,
            endMinute: 59,
            tip: ''
        }),
        new Todo({
            name: "Sauna",
            level: "HIGH",
            duration: 60,
            isChosen: true,
            startHour: 17,
            startMinute: 0,
            endHour: 23,
            endMinute: 59,
            isBlocking: true,
        }),
        new Todo({
            name: "Do the dishes",
            level: "MEDIUM",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
        }),
        new Todo({
            name: "Run the dryer",
            level: "HIGH",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
        }),
        new Todo({
            name: "Watch some TV",
            level: "MEDIUM",
            duration: 120,
            isChosen: true,
            startHour: 17,
            startMinute: 0,
            endHour: 23,
            endMinute: 59,
        }),
        new Todo({
            name: "Floor Heating",
            level: "HIGH",
            duration: 120,
            isChosen: true,
            startHour: 0,
            startMinute: 0,
            endHour: 23,
            endMinute: 59,
            isHeating: true,
        })
    )

    return todoItems
}
