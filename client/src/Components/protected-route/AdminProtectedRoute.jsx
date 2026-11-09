import { Navigate,Outlet } from "react-router-dom";
import React from "react";

import AdminLayout from "../layout/AdminLayout";


const AdminProtectedRoute=()=>{
    const token=localStorage.getItem("token");
    const role=localStorage.getItem("role");

    //verify the authentication and admin role
    if(!token || !role || role.toLowerCase() !=="admin"){
        return <Navigate to="/Login" replace/>;
    }
    //Render the matched admin component directly
    // return<Outlet/>;

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};
export default AdminProtectedRoute;