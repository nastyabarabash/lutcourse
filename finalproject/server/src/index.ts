import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err))

app.get("/", (req, res) => {
  res.send("API is running")
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
