import jwt from "jsonwebtoken";

export const setCookies = (res, user) => {

    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:"1d" });
    res.cookie("user-jwt", token, { 
        httpOnly: true,                                     // prevent XSS attack
        sameSite: "strict",                                 // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production" ,     // prevent man-in-the-middle attack
        maxAge:24*60*60*1000 
    });
    
    return token;
}

