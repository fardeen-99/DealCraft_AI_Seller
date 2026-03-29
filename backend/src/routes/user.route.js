import { Router } from "express";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/auth.controller.js";


const authRoute=Router();

import { authMiddleware } from "../middleware/auth.middleware.js";


authRoute.post("/register",registerUser)
authRoute.post("/login",loginUser)
authRoute.post("/logout",authMiddleware,logoutUser)
authRoute.get("/getme",authMiddleware,getProfile)



export default authRoute