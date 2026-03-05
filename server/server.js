import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./lib/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/user", userRouter)

connectDB()
    .then(() =>{
        app.listen(3000, () => {
            console.log('server running on port 3000');
        })
    })
    .catch((error) => {
        console.error(error)
    })