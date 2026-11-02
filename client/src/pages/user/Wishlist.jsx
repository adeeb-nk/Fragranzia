import React, { useState } from "react";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import { Link } from "react-router-dom";
import heroperfume from "../../assets/heroperfume.png"
import './Wishlist.css'

import UserService from "../../services/user-api-services/UserService";
import { useEffect } from "react";

export const Wishlist = () => {

    const { getWishlist, deletewishlist } = UserService();

    const [whishlists, setwishlists] = useState([])



    const fetchwishlist = async () => {
        try {
            const res = await getWishlist();
            console.log("Wishlist response:", res);

            setwishlists(
                Array.isArray(res.wishlist) ? res.wishlist : []
            );
        } catch (error) {
            console.error(
                "Wishlist error:",
                error.response?.data || error.message
            );
        }
    };

    //========delete====


    const wishlistdelete = async (id) => {
        try {
            const response = await deletewishlist(id);

            console.log("Delete response:", response);

            await fetchwishlist();
        } catch (error) {
            console.error(
                "Delete wishlist error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to remove product from wishlist"
            );
        }
    };




    useEffect(() => {
        fetchwishlist();
    }, []);

    return (
        <div>
            <div className="Product2-fullnav">
                <h2 id="nav-heading">Fragranzia</h2>
                <div className="home-fullnav1">
                    <div className="home-nav">
                        <nav>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/Product1'>Products</Link></li>
                                <li><Link to='/Wishlist'>Wishlist</Link></li>
                                <li><Link to="/About">About</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="home-navsearch">
                        <FiSearch />
                        <input type="text" placeholder=" Search Here" />
                    </div>
                    <div className="home-navicons">
                        <Link to="/Cart"><FiShoppingCart /></Link>
                                                <FiBell />
                                                <Link to="/Profile"><FiUser /></Link>
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
                    {whishlists.length === 0 ? (
                        <p>Your wishlist is empty.</p>
                    ) : (
                        whishlists.map((product) => (
                            <div className="Wishlist-item" key={product._id}>
                                <div className="Wishlist-image">
                                    <img
                                        src={product.images}
                                        alt={product.name}
                                    />
                                </div>

                                <div className="Wishlist-item-content">
                                    <h2 className="Wishlist-item-title">
                                        {product.name}
                                    </h2>

                                    <div className="Wishlist-price">
                                        <strong className="Wishlist-price-main">
                                            Rs {product.sale_price}
                                        </strong>

                                        <del className="Wishlist-price-old">
                                            Rs {product.product_price}
                                        </del>

                                        <span className="Wishlist-price-offer">
                                            {product.product_price > 0
                                                ? Math.round(
                                                    ((product.product_price - product.sale_price) /
                                                        product.product_price) * 100
                                                ) + "% off"
                                                : ""}
                                        </span>
                                    </div>

                                    <div className="Wishlist-allbuttonss">
                                        <div className="Wishlist-button-1">
                                            <button onClick={() => wishlistdelete(product._id)}>Delete</button>
                                        </div>

                                        <div className="Wishlist-button-2">
                                            <button>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>


            </div>


            {/* foooter */}
            <div className="home-footer">
                <div className="home-footerlogo"><h1>Fragranzia</h1></div>
                <div className="home-footercolumn">
                    <h3>Pages</h3>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                                                <li><Link to='/Product1'>Products</Link></li>
                                                <li><Link to='/Wishlist'>Wishlist</Link></li>
                                                <li><Link to="/About">About</Link></li>
                                                <li><Link to="/Profile">Profile</Link></li>
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