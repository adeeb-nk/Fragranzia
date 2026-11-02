import { Navigate,Outlet } from "react-router-dom";

const AdminProtectedRoute=()=>{
    const token=localStorage.getItem("token");
    const role=localStorage.getItem("role");

    //verify the authentication and admin role
    if(!token || !role || role.toLowerCase() !=="admin"){
        return <Navigate to="/Login" replace/>;
    }
    //Render the matched admin component directly
    return<Outlet/>;
};
export default AdminProtectedRoute;