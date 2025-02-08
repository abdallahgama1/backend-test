import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = await User.create({ email, password, name });

        const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET, { expiresIn:"1d" });
        res.cookie("user-jwt", token, { 
            httpOnly: true,                                     // prevent XSS attack
            sameSite: "strict",                                 // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" ,     // prevent man-in-the-middle attack
            maxAge:24*60*60*1000 
        });

        res.status(201).json({
            jwt: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }, message: "User created successfully"
        });

    } catch (error) {
        console.log("error from signup controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: " Invalid Credentials" });
        }

        const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET, { expiresIn:"1d" });
        res.cookie("user-jwt", token, { 
            httpOnly: true,                                     // prevent XSS attack
            sameSite: "strict",                                 // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" ,     // prevent man-in-the-middle attack
            maxAge:24*60*60*1000 
        });

        res.status(200).json({
            jwt: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: "User logged in successfully"
        });

    } catch (error) {
        console.log("error from login controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("user-jwt");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
