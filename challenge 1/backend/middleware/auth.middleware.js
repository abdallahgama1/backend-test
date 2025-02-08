import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies["user-jwt"];

        if (!token) return res.status(401).json({ message: "Unauthorized - No Token Provided" });

        token = token.trim(); 

        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        }catch (error) {
            return res.status(401).json({ message: "Unauthorized - Token Expired" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const adminRoute = async (req, res, next) => {
    if(!req.user) return res.status(401).json({ error: "Unauthorized" }); 

    if (req.user.role === "admin") 
    {
        next();
    }else{
        return res.status(403).json({ error: " Access denied - Admin only." });
    }
};