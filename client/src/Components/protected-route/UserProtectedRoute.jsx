import { Navigate,Outlet } from "react-router-dom";

const LoginProtectedRoute=()=>{
    let token=localStorage.getItem("token")
    let role=localStorage.getItem("role")
    if(!token || !role || role.toLowerCase()!=="user"){
       return <Navigate to="/Login" replace/>;

    }
    return <Outlet/>;
}
export default LoginProtectedRoute;