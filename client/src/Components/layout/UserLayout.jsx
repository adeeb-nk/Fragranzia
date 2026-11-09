
import React from "react";
import { Outlet } from "react-router-dom";

import UserNavbar from "../user/UserNavbar.jsx";

const UserLayout = () => {

    return (
        <>
            <UserNavbar />

            <main className="user-main-content">
                <Outlet />
            </main>
        </>
    );
};

export default UserLayout;