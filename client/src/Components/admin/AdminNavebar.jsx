
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavebar.css";

import {
    MdDashboard,
    MdInventory2,
    MdCategory,
    MdPeople,
    MdShoppingCart,
    MdLogout
} from "react-icons/md";

const AdminNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/Login");
    };

    return (
        <aside className="category-fullnav">

            {/* Logo */}
            <div className="frag-logo">
                <h2>Dashtar</h2>
                <span>ADMIN PANEL</span>
            </div>

            {/* Navigation */}
            <nav className="frag-navigation">

                <p className="frag-nav-label">MAIN MENU</p>

                <ul>

                    <li>
                        <MdDashboard />
                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <MdInventory2 />
                        <NavLink to="/Productadmin1">
                            Products
                        </NavLink>
                    </li>

                    <li>
                        <MdCategory />
                        <NavLink to="/Category">
                            Categories
                        </NavLink>
                    </li>

                    <li>
                        <MdPeople />
                        <NavLink to="/User">
                            Customers
                        </NavLink>
                    </li>

                    <li>
                        <MdShoppingCart />
                        <NavLink to="/Order">
                            Orders
                        </NavLink>
                    </li>

                </ul>

            </nav>

            {/* Bottom Section */}
            <div className="frag-sidebar-bottom">

                <div className="frag-admin-profile">

                    <div className="frag-admin-avatar">
                        F
                    </div>

                    <div>
                        <h4>Admin</h4>
                        <p>Store Manager</p>
                    </div>

                </div>

                <button
                    className="frag-logout"
                    onClick={handleLogout}
                >
                    <MdLogout />
                    Log Out
                </button>

            </div>

        </aside>
    );
};

export default AdminNavbar;
