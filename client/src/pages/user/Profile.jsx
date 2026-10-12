import React, { useState, useEffect } from "react";
import './Profile.css'
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import heroperfume from "../../assets/heroperfume.png"
import axios from 'axios'


export const Profile = () => {

    return (
        <div>
            <div className="Product2-fullnav">
                <h2 id="nav-heading">Fragranzia</h2>
                <div className="home-fullnav1">
                    <div className="home-nav">
                        <nav>
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Products</a></li>
                                <li><a href="">Gifting</a></li>
                                <li><a href="">About</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="home-navsearch">
                        <FiSearch />
                        <input type="text" placeholder=" Search Here" />
                    </div>
                    <div className="home-navicons">
                        <FiShoppingCart />
                        <FiBell />
                        <FiUser />
                    </div>
                </div>
            </div>


            {/* ===========profile========== */}

            <div className="Profile-belownav">
                <h1>Profile</h1>
                <p>Home   ›   Profile</p>
            </div>

            {/* ================button================ */}
            <div className="profile-buttons">
                <button id="profile-buttons1">Profile</button>
                <button id="profile-buttons2">Address</button>
                <button id="profile-buttons3">My Orders</button>
            </div>

            <form action="" className="profile-fullform">
                <div className="profile-sections">
                    <div className="profile-inputs">
                        <label htmlFor="">Fullname</label><br />
                        <input type="text" placeholder=" Thomas" />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Email</label><br />
                        <input type="text" placeholder=" thomas@gmail.com" />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Phone Number</label><br />
                        <input type="text" placeholder=" 9562478082" />
                    </div>
                </div>
                <div className="profile-sections">
                    <div className="profile-inputs">
                        <label htmlFor="">Date of Birth</label><br />
                        <input type="text" placeholder=" 23-03-2030" />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Gender</label><br />
                        <input type="text" placeholder=" Male" />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Password</label><br />
                        <input type="text" placeholder=" ******" />
                    </div>
                </div>
            </form>

            <div className="profile-editbtn">
                <button>Edit</button>
            </div>
        </div>
    )


}