import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import {insertTodo} from "./controllers/todoController";

// Start Mongoose connection
const uri: string = "mongodb://localhost:27017/junction"
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully")
})

const app: Application = express()

const port: number = 3001

app.get("/", (req: Request, res: Response) => {
    res.send("Hello ")
})

app.get("/save-todo", async (req: Request, res: Response) => {
    insertTodo();
    res.send('SAVED!');
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
