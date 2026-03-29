import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

import authRoute from "./routes/user.route.js";
import gameRoute from "./routes/game.route.js";
app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());


app.use("/api/auth",authRoute);
app.use("/api/game",gameRoute);


import path from "path";

app.get("*Name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})




export default app