import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import { insertTodo } from "./controllers/todoController"
import { createMockData } from "./controllers/electricityPriceController"
import { insertOutsideHours } from "./controllers/outsideHoursController"
import { IOutsideHours } from "./schemas"
import bodyParser from "body-parser"
import { parse, parseISO } from "date-fns"

// Start Mongoose connection
const uri: string = "mongodb://localhost:27017/junction"
mongoose.connect(uri)
export const db = mongoose.connection
db.once("open", function () {
    console.log("MongoDB database connection established successfully")
})

const app: Application = express()
app.use(bodyParser.json())
const port: number = 3001
createMockData()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello ")
})

app.get("/save-todo", async (req: Request, res: Response) => {
    insertTodo()
    res.send("SAVED!")
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

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
