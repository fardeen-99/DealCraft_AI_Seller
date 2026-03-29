import { useDispatch } from "react-redux";
import { getleaderboard, getAllProducts, startGame } from "../services/game.service";
import { setleaderboard, setloading, seterror, setproducts } from "../chat.slice";
import { useNavigate } from "react-router-dom";

export const useGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGetleaderboard = async () => {
        try {
            dispatch(setloading(true));
            const response = await getleaderboard();
            dispatch(setleaderboard(response.leaderboard));
            dispatch(setloading(false));
        } catch (error) {
            dispatch(seterror(error?.response?.data?.message || "Failed to fetch leaderboard"));
            dispatch(setloading(false));
        }
    };

    const handleGetProducts = async () => {
        try {
            dispatch(setloading(true));
            const response = await getAllProducts();
            dispatch(setproducts(response));
            dispatch(setloading(false));
        } catch (error) {
            dispatch(seterror(error?.response?.data?.message || "Failed to fetch products"));
            dispatch(setloading(false));
        }
    };

    const handleStartGame = async (productId) => {
        try {
            dispatch(setloading(true));
            const response = await startGame(productId);
            // Navigate to game session with the new sessionId
            navigate(`/game/${response.sessionId}`);
            dispatch(setloading(false));
        } catch (error) {
            dispatch(seterror(error?.response?.data?.message || "Failed to start game"));
            dispatch(setloading(false));
        }
    };

    return {
        handleGetleaderboard,
        handleGetProducts,
        handleStartGame
    };
};