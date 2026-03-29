import axios from "axios";

const API=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

export const registerUser=async(form)=>{
    const response=await API.post("/register",form);
    return response.data;
}

export const loginUser=async(form)=>{
    const response=await API.post("/login",form);
    return response.data;
}

export const logoutUser=async()=>{
    const response=await API.post("/logout");
    return response.data;
}

export const getme=async()=>{
    const response=await API.get("/getme");
    return response.data;
}