import { ITodo, Todo } from "../schemas"
import { parseISO, setHours } from "date-fns"
import { db } from "../app"
import { Schema } from "mongoose"

export const insertTodo = async (todo: ITodo) => {
    const todoItem = new Todo(todo)
    await todoItem.save()
}

export const insertDefaultTodos = async () => {
    const todo = await Todo.findOne({ name: "Laundry" })
    if (todo == null) {
        await db.collection("todos").insertMany(defaultTodos())
        console.log("Inserted default todos!")
    }
}

export const getTodos = async () => {
    return await Todo.find({}).then((res) => {
        return res
    })
}

export const updateTodos = async (id: string, isChosen: boolean) => {
    return await Todo.findByIdAndUpdate(id, { isChosen })
}

const defaultTodos = () => {
    const todoItems = []
    todoItems.push(
        new Todo({
            name: "Laundry",
            level: "MEDIUM",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
        }),
        new Todo({
            name: "Make coffee",
            level: "MEDIUM",
            duration: 30,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 12,
            endMinute: 0,
        }),
        new Todo({
            name: "Cook",
            level: "HIGH",
            duration: 60,
            isChosen: true,
            startHour: 16,
            startMinute: 0,
            endHour: 19,
            endMinute: 0,
        }),
        new Todo({
            name: "Charge car",
            level: "HIGH",
            duration: 120,
            isChosen: true,
            startHour: 0,
            startMinute: 0,
            endHour: 23,
            endMinute: 59,
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
            name: "Dishes",
            level: "MEDIUM",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
        }),
        new Todo({
            name: "Dryer",
            level: "HIGH",
            duration: 120,
            isChosen: true,
            startHour: 8,
            startMinute: 0,
            endHour: 21,
            endMinute: 0,
        }),
        new Todo({
            name: "Watch TV",
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
