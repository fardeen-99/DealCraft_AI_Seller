import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}