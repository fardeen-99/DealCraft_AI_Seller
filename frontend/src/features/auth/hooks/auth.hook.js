import { useDispatch } from "react-redux"
import { setloading, setuser,seterror } from "../auth.slice"
import { registerUser, loginUser, logoutUser, getme } from "../services/auth.services"

const useAuth=()=>{
 
    const dispatch=useDispatch()


const handleRegister=async(form)=>{
    try {
        dispatch(setloading(true));
        const response=await registerUser(form);
        dispatch(setuser(response.user));
    } catch (error) {
        console.error(error);
    }finally{
        dispatch(setloading(false));
    }
}
const handleLogin=async(form)=>{
    try {
        dispatch(setloading(true));
        const response=await loginUser(form);
        dispatch(setuser(response.user));
    } catch (error) {
        console.error(error);
    }finally{
        dispatch(setloading(false));
    }
}
const handleLogout=async()=>{
    try {
        dispatch(setloading(true));
        const response=await logoutUser();
        dispatch(setuser(null));
    } catch (error) {
        console.error(error);
    }finally{
        dispatch(setloading(false));
    }
}
const handleGetme=async()=>{
    try {
        dispatch(setloading(true));
        const response=await getme();
        dispatch(setuser(response.user));
    } catch (error) {
        console.error(error);
    }finally{
        dispatch(setloading(false));
    }
}

return{
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetme
}


}
export default useAuth