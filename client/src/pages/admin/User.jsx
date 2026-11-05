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

import AdminService from "../../services/admin-api-services/AdminService";
import { useEffect } from "react";

export const User = () => {

    const { fetchUser, statususer } = AdminService();

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setusers] = useState([])

    const handleShowUser = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    const fetchedUser = async () => {
        try {
            const res = await fetchUser();
            setusers(res);
        } catch (error) {
            console.error(
                "Error fetching users:",
                error.response?.data || error.message
            );
        }
    };

    const onblockchange = async (id, isActive) => {
        try {
            await statususer(id, { isActive: !isActive });
            await fetchedUser();
        } catch (error) {
            console.error(
                "Failed to update status:",
                error.response?.data || error.message
            );
        }
    };


    useEffect(() => {
        fetchedUser();
    }, [])

    return (
        <div className="user-page">

            {/* SIDEBAR */}
            <aside className="category-fullnav">
                        
                                <div className="frag-logo">
                                  <h2>Dashtar</h2>
                                  <span>ADMIN PANEL</span>
                                </div>
                        
                                <nav className="frag-navigation">
                        
                                  <p className="frag-nav-label">MAIN MENU</p>
                        
                                  <ul>
                        
                                    <li className="active">
                                      <MdDashboard />
                                      <Link to="/dashboard">Dashboard</Link>
                                    </li>
                        
                                    <li>
                                      <MdInventory2 />
                                      <Link to="/Productadmin1">Products</Link>
                                    </li>
                        
                                    <li>
                                      <MdCategory />
                                      <Link to="/Category">Categories</Link>
                                    </li>
                        
                        
                                    <li>
                                      <MdPeople />
                                      <Link to="/User">Customers</Link>
                                    </li>
                        
                                    <li>
                                      <MdShoppingCart />
                                      <Link to="/Order">Orders</Link>
                                    </li>
                        
                                  </ul>
                        
                                </nav>
                        
                                <div className="frag-sidebar-bottom">
                        
                                  <div className="frag-admin-profile">
                                    <div className="frag-admin-avatar">F</div>
                                    <div>
                                      <h4>Admin</h4>
                                      <p>Store Manager</p>
                                    </div>
                                  </div>
                        
                                  <button
                                    className="frag-logout"
                                  >
                                    <MdLogout />
                                    Log Out
                                  </button>
                        
                                </div>
                        
                              </aside>
            


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
                                        <button
                                            className="user-block-btn"
                                            onClick={() => onblockchange(user._id, user.isActive)}
                                        >
                                            {user.isActive ? "Block" : "Unblock"}
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