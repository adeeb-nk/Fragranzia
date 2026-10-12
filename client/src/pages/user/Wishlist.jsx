import React, { useState } from "react";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import { Link } from "react-router-dom";
import heroperfume from "../../assets/heroperfume.png"
import './Wishlist.css'

const cartimg = [
    {
        id: 1,
        image: heroperfume,
        name: "Autograph eau de parfum 100ml for men",
        price: "Rs 899",
        oldprice: "Rs 2000",
        offer: "61% off",
    },
    {
        id: 2,
        image: heroperfume,
        name: "Autograph eau de parfum 100ml for men",
        price: "Rs 899",
        oldprice: "Rs 2000",
        offer: "61% off",
    },
    {
        id: 3,
        image: heroperfume,
        name: "Royal eau de parfum 100ml for men",
        price: "Rs 899",
        oldprice: "Rs 2000",
        offer: "61% off",
    },
];

export const Wishlist = () => {

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

            {/* =============================================== */}
            {/* BREADCRUMB HEADER */}
            <div className="Wishlist-section-2">
                <h1>Wishlist</h1>
                <p>Home   ›   Wishlist</p>
            </div>

            {/* MAIN LAYOUT: PRODUCTS ON LEFT, CHECKOUT ON RIGHT */}
            <div className="Wishlist-page-layout">

                {/* Left Side: All Cart Items Stacked Vertically */}
                <div className="Wishlist-products">
                    {cartimg.map((user) => (
                        <div className="Wishlist-item" key={user.id}>
                            <div className="Wishlist-image">
                                <img src={user.image} alt={user.name} />
                            </div>

                            <div className="Wishlist-item-content">
                                <h2 className="Wishlist-item-title">{user.name}</h2>


                                <div className="Wishlist-price">
                                    <strong className="Wishlist-price-main">{user.price}</strong>
                                    <del className="Wishlist-price-old">{user.oldprice}</del>
                                    <span className="Wishlist-price-offer">{user.offer}</span>
                                </div>

                                <div className="Wishlist-allbuttonss">
                                    <div className="Wishlist-button-1">
                                        <button>Delete</button>
                                    </div>
                                    <div className="Wishlist-button-2">
                                        <button>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


            {/* foooter */}
            <div className="home-footer">
                <div className="home-footerlogo"><h1>Fragranzia</h1></div>
                <div className="home-footercolumn">
                    <h3>Pages</h3>
                    <ul>
                        <li><Link to="">Home</Link></li>
                        <li><Link to="">Products</Link></li>
                        <li><Link to="">Gifting</Link></li>
                        <li><Link>About</Link></li>
                        <li><Link>Profile</Link></li>
                    </ul>
                </div>
                <div className="home-footercolumn">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link>Privacy Policy</Link></li>
                        <li><Link>Terms and <br />conditions</Link></li>
                        <li><Link>FAQs</Link></li>
                        <li><Link>Customer <br />Service</Link></li>
                    </ul>
                </div>
                <div className="home-footercolumn">
                    <ul>
                        <li><FiMail /><Link>ftrafurniture@gmail.com</Link></li>
                        <li><FiPhone /><Link>+91 9876543210</Link></li>
                    </ul>
                    <h3>Social media</h3>
                    <FiInstagram /><FiFacebook /><FiYoutube /><FiLinkedin />
                </div>
            </div>

            <div className="home-footerbelow">
                <p>Web Accessibility | Terms of Use | Privacy Statement | Contact Us</p>
                <p>© 2024 fragranzia Company. All rights reserved.</p>
            </div>

        </div>
    )
}