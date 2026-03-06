import { Router } from "express"
import {
    login,
    signup,
    logout,
    verifyOtp,
    verifyUser,
    resendOtp
} from "../controllers/user.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)
router.route("/verify-otp").post(verifyOtp)
router.route("/resend-otp").post(resendOtp)
router.route("/verify-user").get(verifyJWT,verifyUser)

export default router;