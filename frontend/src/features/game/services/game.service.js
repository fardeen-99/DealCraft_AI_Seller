import axios from 'axios'


const API = axios.create({
    baseURL: "/api/game",
    withCredentials: true
})

export const getleaderboard = async () => {
    const response = await API.get("/leaderboard")
    return response.data
}

export const getAllProducts = async () => {
    const response = await API.get("/product")
    return response.data
}

export const startGame = async (productId) => {
    const response = await API.post("/start", { productId })
    return response.data
}