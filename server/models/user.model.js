import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import hash from "../utils/hash.js";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    try {
        this.password = await hash(this.password);

    } catch (error) {
        console.error(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function () {
    const payload = {
        userId: this._id,
        username: this.username,
        email: this.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
    return token
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;