import { Router } from "express";
import { startGame, makeOffer, getSession, getAllProducts, getLeaderboard } from "../controllers/game.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const gameRoute=Router();



gameRoute.post("/start",authMiddleware,startGame)
gameRoute.post("/offer",authMiddleware,makeOffer)
gameRoute.get("/product",authMiddleware,getAllProducts)
gameRoute.get("/leaderboard",authMiddleware,getLeaderboard)
gameRoute.get("/:sessionId",authMiddleware,getSession)


    
export default gameRoute