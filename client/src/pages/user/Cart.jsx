import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import { Link } from "react-router-dom";
import heroperfume from "../../assets/heroperfume.png"
import './Cart.css'

import UserService from "../../services/user-api-services/UserService";

export const Cart = () => {

    const { getCarts, changequantity, deleteCart } = UserService();

    const [carts, setCarts] = useState([])


    const fetchcarts = async () => {
        try {
            const res = await getCarts();

            console.log("Cart response:", res);

            setCarts(Array.isArray(res.cart) ? res.cart : []);
        } catch (error) {
            console.error(
                "Error fetching cart:",
                error.response?.data || error.message
            );
            setCarts([]);
        }
    };


    const handleQuantity = async (id, quantity) => {
        if (quantity < 1) return;

        try {
            const response = await changequantity(id, quantity);

            console.log("Quantity updated:", response);

            await fetchcarts();
        } catch (error) {
            console.error(
                "Quantity update failed:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update quantity"
            );
        }
    };

    //==================delete=================


    const cartdelete = async (id) => {
        try {
            await deleteCart(id);
            await fetchcarts();
        } catch (error) {
            console.error(
                "Delete cart error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to remove product from cart"
            );
        }
    };


    // =========================total prize=====================

    const totalItems = carts.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = carts.reduce(
        (total, item) =>
            total + Number(item.product?.product_price || 0) * item.quantity,
        0
    );

    const totalDiscount = carts.reduce(
        (total, item) => {
            const originalPrice = Number(item.product?.product_price || 0);
            const salePrice = Number(item.product?.sale_price || 0);

            return total + Math.max(0, originalPrice - salePrice) * item.quantity;
        },
        0
    );

    const totalAmount = carts.reduce(
        (total, item) =>
            total + Number(item.product?.sale_price || 0) * item.quantity,
        0
    );

    const deliveryCharge = totalAmount >= 999 || totalAmount === 0 ? 0 : 50;
    const finalAmount = totalAmount + deliveryCharge;

    const formatPrice = (price) =>
        `Rs ${price.toLocaleString("en-IN", {
            maximumFractionDigits: 2
        })}`;




    useEffect(() => {
        fetchcarts();
    }, []);

    return (
        <div>
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
                    {carts.map((item) => {
                        const product = item.product;

                        if (!product) return null;

                        return (
                            <div
                                className="cart-item"
                                key={product._id}
                            >
                                <div className="cart-image">
                                    <img
                                        src={product.images}
                                        alt={product.name}
                                    />
                                </div>

                                <div className="cart-item-content">
                                    <h2 className="cart-item-title">
                                        {product.name}
                                    </h2>

                                    <div className="cart-buttons-row">
                                        <div className="cart-buttons">
                                            <button onClick={() => handleQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantity(item.product._id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>

                                    <div className="cart-price">
                                        <strong className="cart-price-main">
                                            Rs {product.sale_price}
                                        </strong>

                                        <del className="cart-price-old">
                                            Rs {product.product_price}
                                        </del>
                                    </div>

                                    <div className="cart-allbuttonss">
                                        <div className="cart-button-1">
                                            <button onClick={() => cartdelete(item.product._id)}>Delete</button>
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
                        );
                    })}
                </div>


                {/* Right Side: Fixed Checkout Box */}

                <div className="cart-checkout-full">
                    <div className="cart-checkout">
                        <h2>Check Out</h2>

                        <div className="cart-checkout-row">
                            <span>Price ({totalItems} items)</span>
                            <span className="cart-checkout-val-dark">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        <div className="cart-checkout-row">
                            <span>Discount</span>
                            <span className="checkout-val-dark">
                                - {formatPrice(totalDiscount)}
                            </span>
                        </div>

                        <div className="cart-checkout-row">
                            <span>Delivery Charge</span>
                            <span className="checkout-val-free">
                                {deliveryCharge === 0
                                    ? "Free"
                                    : formatPrice(deliveryCharge)}
                            </span>
                        </div>

                        <hr className="cart-checkout-divider" />

                        <div className="cart-checkout-total-row">
                            <span>Total Amount</span>
                            <span className="cart-checkout-val-total">
                                {formatPrice(finalAmount)}
                            </span>
                        </div>
                    </div>

                    <Link to="/Payment">
                        <button className="cart-proceed-btn">
                            Proceed to Buy
                        </button>
                    </Link>

                    <div className="cart-secure-payment-box">
                        <p>
                            Safe and Secure Payments. Easy returns.
                            100% Authentic products.
                        </p>
                    </div>
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