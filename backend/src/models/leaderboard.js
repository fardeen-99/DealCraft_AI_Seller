import mongoose from "mongoose";


const boardSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rounds:{
        type:Number,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
,
finalPrice:{
    type:Number,
    required:true
}


})

const Leaderboard=mongoose.model("Leaderboard",boardSchema)
export default Leaderboard