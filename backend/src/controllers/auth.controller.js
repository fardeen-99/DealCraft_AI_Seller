import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const registerUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;

 const isUSERalreadyExist=await User.findOne({

    $or:[{username},{email}]
 });
 if(isUSERalreadyExist){
    return res.status(400).json({ message: "User already exist" });
 }


        const user=await User.create({username,email,password});



        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2d"});
        res.cookie("token",token);

        res.json({
            message:"User created successfully",
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid=await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }

  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2d"});
        res.cookie("token",token);


        res.json({
            message:"User logged in successfully",
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logoutUser=async(req,res)=>{



    try {

        res.clearCookie("token");

        res.json({ message: "User logged out" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        res.json({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}