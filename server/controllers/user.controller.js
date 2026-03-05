import User from "../models/user.model.js";
import cookiesOption from "../configs/cookiesOption.js"
import bcrypt from "bcryptjs";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";
import hash from "../utils/hash.js"
import sendOTP from "../templates/emailTemplate.js";

const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        email = email.trim().toLowerCase();
        username = username.trim().toLowerCase();

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const otp = generateOtp();
        const hashedOtp = await hash(otp);

        const user = await User.create({
            username,
            email,
            password,
            otp: hashedOtp,
            otpExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
            isVerified: false
        });

        await sendEmail(
            email,
            "Verify your account",
            sendOTP(user.username, otp)
        );

        return res.status(201).json({
            message: "User created. Please verify OTP sent to your email.",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid request"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "User already verified"
            });
        }

        if (!user.otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        const isOtpValid = await bcrypt.compare(otp.toString(), user.otp);

        if (!isOtpValid) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // ✅ Mark as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        // ✅ Generate token
        const token = await user.generateAuthToken();

        // ✅ Send cookie
        res.cookie("token", token, cookiesOption);

        return res.status(200).json({
            message: "Account verified and logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await user.generateAuthToken();

        res.cookie("token", token, cookiesOption);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const logout = async (_, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verifyUser = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { signup, login, logout, verifyOtp, verifyUser };