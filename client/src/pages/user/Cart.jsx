import React, { useState } from "react";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import { Link } from "react-router-dom";
import heroperfume from "../../assets/heroperfume.png"
import './Cart.css'

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

export const Cart = () => {

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
            <div className="cart-section-2">
                <h1>Cart</h1>
                <p>Home   ›   Cart</p>
            </div>

            {/* MAIN LAYOUT: PRODUCTS ON LEFT, CHECKOUT ON RIGHT */}
            <div className="cart-page-layout">

                {/* Left Side: All Cart Items Stacked Vertically */}
                <div className="cart-products">
                    {cartimg.map((user) => (
                        <div className="cart-item" key={user.id}>
                            <div className="cart-image">
                                <img src={user.image} alt={user.name} />
                            </div>

                            <div className="cart-item-content">
                                <h2 className="cart-item-title">{user.name}</h2>

                                <div className="cart-buttons-row">
                                    <div className="cart-buttons">
                                        <button>-</button> <span>1</span> <button>+</button>
                                    </div>
                                </div>

                                <div className="cart-price">
                                    <strong className="cart-price-main">{user.price}</strong>
                                    <del className="cart-price-old">{user.oldprice}</del>
                                    <span className="cart-price-offer">{user.offer}</span>
                                </div>

                                <div className="cart-allbuttonss">
                                    <div className="cart-button-1">
                                        <button>Delete</button>
                                    </div>
                                    <div className="cart-button-2">
                                        <button>Share</button>
                                    </div>
                                    <div className="cart-button-3">
                                        <button>Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Fixed Checkout Box */}
                <div className="cart-checkout-full">
                    <div className="cart-checkout">
                        <h2>Check Out</h2>
                        <div className="cart-checkout-row">
                            <span>Price (3 item)</span>
                            <span className="cart-checkout-val-dark">Rs 3,097</span>
                        </div>
                        <div className="cart-checkout-row">
                            <span>Discount</span>
                            <span className="checkout-val-dark">Rs 4,404</span>
                        </div>
                        <div className="cart-checkout-row">
                            <span>Delivery Charge</span>
                            <span className="checkout-val-free">Free</span>
                        </div>
                        <hr className="cart-checkout-divider" />
                        <div className="cart-checkout-total-row">
                            <span>Total Amount</span>
                            <span className="cart-checkout-val-total">Rs 3,493</span>
                        </div>
                    </div>
                    <button className="cart-proceed-btn">Proceed to Buy</button>

                    <div className="cart-secure-payment-box">
                        <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                    </div>
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