import express, { Application, Request, Response } from "express"
import mongoose, { Schema } from "mongoose"
import {
    getTodos,
    insertDefaultTodos,
    insertTodo,
    updateTodos,
} from "./controllers/todoController"
import {
    createMockData,
    getElectricityPrices,
} from "./controllers/electricityPriceController"
import { insertOutsideHours } from "./controllers/outsideHoursController"
import {IOutsideHours, ITodo, ITodoUpdateReq, Todo} from "./schemas"
import bodyParser from "body-parser"
import { parseISO } from "date-fns"
import { calculateSchedule, getSchedule } from "./controllers/scheduleMaker"
import timemachine from "timemachine"
var cors = require("cors")

// SET THIS TO RUN SERVER IN A CERTAIN TIME
timemachine.config({
    dateString: "November 06, 2022 06:00:00",
})
// Start Mongoose connection
const uri: string = "mongodb://localhost:27017/junction"
mongoose.connect(uri)
export const db = mongoose.connection
db.once("open", function () {
    console.log("MongoDB database connection established successfully")
})

const app: Application = express()
app.use(bodyParser.json())
app.use(cors())
const port: number = 3001
createMockData()
insertDefaultTodos()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello ")
})

app.use(cors())
app.post("/todo", async (req: Request, res: Response) => {
    const body = req.body
    let success = false
    if (
        body != null &&
        body.startHour != null &&
        body.startMinute != null &&
        body.endHour != null &&
        body.endMinute != null &&
        body.duration != null &&
        body.name != null &&
        body.level != null
    ) {
        const input = new Todo({
            name: body.name,
            duration: body.duration,
            level: body.level,
            startHour: body.startHour,
            startMinute: body.startMinute,
            endHour: body.endHour,
            endMinute: body.endMinute,
            isChosen: true,
        })

        await insertTodo(input)
        success = true
    }
    res.status(success ? 201 : 400)
    res.send("")
})

app.get("/todos", async (req: Request, res: Response) => {
    const todos = await getTodos()
    res.json(todos)
})

app.get("/electricity-prices", async (req: Request, res: Response) => {
    const electricityPrices = await getElectricityPrices()
    res.json(electricityPrices)
})

app.put("/todo/:id", async (req: Request, res: Response) => {
    const body = req.body
    let success = false
    if (body != null && req.params != null && req.params.id != null) {
        let idParam: string = req.params.id
        await updateTodos(idParam, body as ITodoUpdateReq)
        success = true
    }
    res.status(success ? 200 : 400)
    res.send("")
})

app.post("/outside-hours", async (req: Request, res: Response) => {
    const body = req.body
    let input: IOutsideHours | null = null
    if (body != null && body.startDate != null && body.endDate != null) {
        input = {
            startDate: parseISO(body.startDate),
            endDate: parseISO(body.endDate),
        }
    }
    await insertOutsideHours(input)
    res.send("OK!")
})

app.post("/schedule", async (req: Request, res: Response) => {
    await calculateSchedule()
    res.status(201)
    res.send("")
})

app.get("/schedule", async (req: Request, res: Response) => {
    res.status(201)
    res.send(await getSchedule())
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
