import React, { useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";

import {
    MdDashboard,
    MdInventory2,
    MdCategory,
    MdLocalOffer,
    MdPeople,
    MdShoppingCart,
    MdLogout,
    MdVisibility,
    MdClose
} from "react-icons/md";

export const User = () => {

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users] = useState([
        {
            id: 1,
            name: "user 1",
            phone: "1122334455",
            email: "user1@gmail.com",
            status: "Active",
            role: "User",
            joinedDate: "June 26, 2026 at 11:10 AM"
        },
        {
            id: 2,
            name: "user 2",
            phone: "2211334455",
            email: "user2@gmail.com",
            status: "Active",
            role: "User",
            joinedDate: "June 27, 2026 at 10:30 AM"
        },
        {
            id: 3,
            name: "user 3",
            phone: "3311224455",
            email: "user3@gmail.com",
            status: "Active",
            role: "User",
            joinedDate: "June 28, 2026 at 09:45 AM"
        },
        {
            id: 4,
            name: "user 4",
            phone: "4411223355",
            email: "user4@gmail.com",
            status: "Active",
            role: "User",
            joinedDate: "June 29, 2026 at 12:20 PM"
        }
    ]);

    const handleShowUser = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="user-page">

            {/* SIDEBAR */}
            <div className="category-fullnav">
                <h2>Dashtar</h2>
                <div className="category-nav">
                    <nav>
                        <ul>
                            <li><MdDashboard /><Link>Dashboard</Link></li>
                            <li><MdInventory2 /><Link to="/Productadmin1">Products</Link></li>
                            <li><MdCategory /><Link to="/Category">Categories</Link></li>
                            <li><MdLocalOffer /><Link>Offers</Link></li>
                            <li><MdPeople /><Link>Customers</Link></li>
                            <li><MdShoppingCart /><Link>Orders</Link></li>
                        </ul>
                    </nav>
                </div>
                <button id="category-logout"><MdLogout />Log Out</button>
            </div>


            {/* MAIN CONTENT */}
            <div className="user-main">

                <div className="user-heading">
                    <h2>User List</h2>
                    <p>Manage registered customer accounts and status</p>
                </div>


                {/* TABLE */}
                <div className="user-table-container">

                    <table className="user-table">

                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>PHONE</th>
                                <th>EMAIL</th>
                                <th>ACTIONS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td className="user-name">
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.phone}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>

                                        <button
                                            className="user-show-btn"
                                            onClick={() => handleShowUser(user)}
                                        >
                                            <MdVisibility />
                                            Show
                                        </button>

                                    </td>

                                    <td>

                                        <button className="user-block-btn">
                                            Block
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* MODAL */}
            {showUserModal && selectedUser && (

                <div className="user-modal-overlay">

                    <div className="user-modal">

                        {/* MODAL HEADER */}
                        <div className="user-modal-header">

                            <h2>User Details</h2>

                            <button
                                id="user-modal-close"
                                onClick={handleCloseUserModal}
                            >
                                <MdClose />
                            </button>

                        </div>


                        {/* FULL NAME */}
                        <div className="user-detail-item">

                            <span className="user-detail-label">
                                FULL NAME
                            </span>

                            <p>
                                {selectedUser.name}
                            </p>

                        </div>


                        {/* EMAIL */}
                        <div className="user-detail-item">

                            <span className="user-detail-label">
                                EMAIL ADDRESS
                            </span>

                            <p>
                                {selectedUser.email}
                            </p>

                        </div>


                        {/* PHONE */}
                        <div className="user-detail-item">

                            <span className="user-detail-label">
                                PHONE NUMBER
                            </span>

                            <p>
                                {selectedUser.phone}
                            </p>

                        </div>


                        {/* STATUS + ROLE */}
                        <div className="user-detail-row">

                            <div className="user-detail-small">

                                <span className="user-detail-label">
                                    ACCOUNT STATUS
                                </span>

                                <span className="user-active">
                                    {selectedUser.status}
                                </span>

                            </div>


                            <div className="user-detail-small">

                                <span className="user-detail-label">
                                    ROLE
                                </span>

                                <span className="user-role">
                                    {selectedUser.role}
                                </span>

                            </div>

                        </div>


                        {/* JOINED DATE */}
                        <div className="user-detail-item">

                            <span className="user-detail-label">
                                JOINED DATE
                            </span>

                            <p>
                                {selectedUser.joinedDate}
                            </p>

                        </div>


                        {/* CLOSE BUTTON */}
                        <div className="user-modal-footer">

                            <button
                                id="user-close-btn"
                                onClick={handleCloseUserModal}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};