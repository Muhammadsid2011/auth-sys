import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        // 1️⃣ Get token from cookie
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Find user (optional but recommended)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // 4️⃣ Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export default verifyJWT;