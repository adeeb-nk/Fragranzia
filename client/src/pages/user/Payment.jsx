import React, { useState } from "react";
import './Product1.css'
import './Payment.css'
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders, FiStar } from 'react-icons/fi'
import homeperfume6 from "../../assets/homeperfume6.png"


export const Payment = () => {
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

            <br />


            <div className="payment-container-top">
                <div className="payment-products">
                    <div className="payment-productimage">
                        <img src={homeperfume6} alt="" />
                    </div>
                    <div className="payment-productdetails">
                        <h3>Autograph eau de parfum 100ml for men</h3>
                        <div className="payment-details-autograph">
                            <p>Auograph</p>
                            <h4>4.5</h4><FiStar />
                        </div>
                        <div className="payment-details-button">
                            <button>-</button>
                            <h3>1</h3>
                            <button>+</button>
                        </div>
                        <div className="payment-details-price">
                            <strong>Rs 899</strong>
                            <del>Rs 2000</del>
                            <p>61% off</p>
                        </div>
                        <p id="payment-details-delivery">Delivered by August 29, Free delivery</p>
                        <p id="payment-details-return">7 day return policy</p>

                    </div>
                </div>


                {/* price details */}
                <div className="payment-pricebox">

                    <h2 className="payment-priceheading">Price Details</h2>

                    <div className="payment-pricerow">
                        <p>Price (1 item)</p>

                        <div className="payment-pricevalue">
                            <strong>Rs 899</strong>
                            <del>Rs 2000</del>
                        </div>
                    </div>

                    <div className="payment-pricerow">
                        <p>Discount (61%)</p>
                        <strong>Rs 1101</strong>
                    </div>

                    <div className="payment-pricerow">
                        <p>Delivery Charge</p>
                        <p className="payment-free">Free Delivery</p>
                    </div>

                    <hr className="payment-price-divider" />

                    <div className="payment-totalrow">
                        <strong>Total Amount</strong>
                        <strong>Rs 899</strong>
                    </div>

                </div>
            </div>


            <div className="payment-bottom">
                {/* personal details */}

                <div className="payment-personal-container">
                    <h2 className="payment-personal-heading">Personal Details</h2>
                    <div className="payment-personal-tabs">
                        <button className="payment-personal-addbtn">Personal Details</button>
                        <button className="payment-personal-tab payment-personal-active">Home</button>
                        <button className="payment-personal-tab">Office</button>
                        <button className="payment-personal-tab">Other</button>
                    </div>
                    <h2 className="payment-personal-address-heading">Address</h2>
                    <div className="payment-personal-address-card-full">
                        <div className="payment-personal-address-card">
                            <h3>Varalu Jaison</h3>
                            <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                            <p>+91 9876543210</p>
                        </div>
                        <div className="payment-personal-address-card">
                            <h3>Varalu Jaison</h3>
                            <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                            <p>+91 9876543210</p>
                        </div>
                        <div className="payment-personal-address-card">
                            <h3>Varalu Jaison</h3>
                            <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                            <p>+91 9876543210</p>
                        </div>
                    </div>
                </div>

                {/* payment methods */}
                <div className="payment-method-container">

                    <h2 className="payment-method-heading">
                        Payment Methods
                    </h2>

                    <div className="payment-method-options">

                        <label className="payment-method-row">
                            <span>Google Pay</span>
                            <input
                                type="radio"
                                name="payment-method"
                                defaultChecked
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Cash on delivery (cash/UPI)</span>
                            <input
                                type="radio"
                                name="payment-method"
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Paytm/Phone Pay/Amazon Pay etc</span>
                            <input
                                type="radio"
                                name="payment-method"
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Credit/Debit card</span>
                            <input
                                type="radio"
                                name="payment-method"
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Net Banking</span>
                            <input
                                type="radio"
                                name="payment-method"
                            />
                        </label>

                    </div>

                    <button className="payment-method-paybtn">
                        Pay Now
                    </button>

                </div>

            </div><br />

        </div>
    )
}