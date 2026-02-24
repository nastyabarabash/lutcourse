import express, { Express } from "express"
import mongoose, { Connection } from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import authRouter from "./routes/auth"

dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 3000

const mongoDB: string = "mongodb://127.0.0.1:27017/clouddrive"

mongoose.connect(mongoDB)
mongoose.Promise = Promise

const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))
db.once("open", () => {
  console.log("MongoDB connected")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Cloud Drive API running")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})