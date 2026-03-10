import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./lib/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import passport from "./configs/passprot.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((_, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
})
console.log(process.env.CLIENT_URL)
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.use("/api/user", userRouter)

app.use(passport.initialize())

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('server running on port 3000');
        })
    })
    .catch((error) => {
        console.error(error)
    })
