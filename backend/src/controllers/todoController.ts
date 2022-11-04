import {Todo} from "../schemas";

export const insertTodo = async () => {
    const todoItem = new Todo({
        name: 'Do laundry',
        time: '14:00',
        kwh: 20
    })
    await todoItem.save();
    console.log(todoItem);
}