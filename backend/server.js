import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
// import { seedProducts } from "./src/utils/seed.js";
dotenv.config();

await connectDB();
// seedProducts();





app.listen(3000,()=>{
console.log(`server is running on port 3000`)

    })