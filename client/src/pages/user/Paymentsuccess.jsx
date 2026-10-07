import React, { useState } from "react";
import './Paymentsuccess.css'
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders, FiStar, FiCheck } from 'react-icons/fi'
import homeperfume6 from "../../assets/homeperfume6.png"


export const Paymentsuccess = () => {
    return (

        <>

            <div className="paymentsuccess-page">
                <div className="paymentsuccess-content">


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




                    <div className="paymentsuccess-container-top">
                        <div className="paymentsuccess-products">
                            <div className="paymentsuccess-productimage">
                                <img src={homeperfume6} alt="" />
                            </div>
                            <div className="paymentsuccess-productdetails">
                                <h3>Autograph eau de parfum 100ml for men</h3>
                                <div className="paymentsuccess-details-autograph">
                                    <p>Auograph</p>
                                    <h4>4.5</h4><FiStar />
                                </div>
                                <div className="paymentsuccess-details-button">
                                    <button>-</button>
                                    <h3>1</h3>
                                    <button>+</button>
                                </div>
                                <div className="paymentsuccess-details-price">
                                    <strong>Rs 899</strong>
                                    <del>Rs 2000</del>
                                    <p>61% off</p>
                                </div>
                                <p id="paymentsuccess-details-delivery">Delivered by August 29, Free delivery</p>
                                <p id="paymentsuccess-details-return">7 day return policy</p>

                            </div>
                        </div>


                        {/* price details */}
                        <div className="paymentsuccess-pricebox">

                            <h2 className="paymentsuccess-priceheading">Price Details</h2>

                            <div className="paymentsuccess-pricerow">
                                <p>Price (1 item)</p>

                                <div className="paymentsuccess-pricevalue">
                                    <strong>Rs 899</strong>
                                    <del>Rs 2000</del>
                                </div>
                            </div>

                            <div className="paymentsuccess-pricerow">
                                <p>Discount (61%)</p>
                                <strong>Rs 1101</strong>
                            </div>

                            <div className="paymentsuccess-pricerow">
                                <p>Delivery Charge</p>
                                <p className="paymentsuccess-free">Free Delivery</p>
                            </div>

                            <hr className="paymentsuccess-price-divider" />

                            <div className="paymentsuccess-totalrow">
                                <strong>Total Amount</strong>
                                <strong>Rs 899</strong>
                            </div>

                        </div>
                    </div>


                    <div className="paymentsuccess-bottom">
                        {/* personal details */}

                        <div className="paymentsuccess-personal-container">
                            <h2 className="paymentsuccess-personal-heading">Personal Details</h2>
                            <div className="paymentsuccess-personal-tabs">
                                <button className="paymentsuccess-personal-addbtn">Personal Details</button>
                                <button className="paymentsuccess-personal-tab payment-personal-active">Home</button>
                                <button className="paymentsuccess-personal-tab">Office</button>
                                <button className="paymentsuccess-personal-tab">Other</button>
                            </div>
                            <h2 className="paymentsuccess-personal-address-heading">Address</h2>
                            <div className="paymentsuccess-personal-address-card-full">
                                <div className="paymentsuccess-personal-address-card">
                                    <h3>Varalu Jaison</h3>
                                    <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                                    <p>+91 9876543210</p>
                                </div>
                                <div className="paymentsuccess-personal-address-card">
                                    <h3>Varalu Jaison</h3>
                                    <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                                    <p>+91 9876543210</p>
                                </div>
                                <div className="paymentsuccess-personal-address-card">
                                    <h3>Varalu Jaison</h3>
                                    <p>varalu Jaison Apartment No. 104, Emerald Heights Opposite Lulu Mall Edappally, Kochi Kerala682024 </p>
                                    <p>+91 9876543210</p>
                                </div>
                            </div>
                        </div>

                        {/* payment methods */}
                        <div className="paymentsuccess-method-container">

                            <h2 className="paymentsuccess-method-heading">
                                Payment Methods
                            </h2>

                            <div className="paymentsuccess-method-options">

                                <label className="paymentsuccess-method-row">
                                    <span>Google Pay</span>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        defaultChecked
                                    />
                                </label>

                                <label className="paymentsuccess-method-row">
                                    <span>Cash on delivery (cash/UPI)</span>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                    />
                                </label>

                                <label className="paymentsuccess-method-row">
                                    <span>Paytm/Phone Pay/Amazon Pay etc</span>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                    />
                                </label>

                                <label className="paymentsuccess-method-row">
                                    <span>Credit/Debit card</span>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                    />
                                </label>

                                <label className="paymentsuccess-method-row">
                                    <span>Net Banking</span>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                    />
                                </label>

                            </div>

                            <button className="paymentsuccess-method-paybtn">
                                Pay Now
                            </button>

                        </div>

                    </div><br />

                    <div className="paymentsuccess-overlay">
                        <div className="paymentsuccess-box">
                            <FiCheck />
                            <h2>Thank You for Ordering!</h2>
                            <p>Your order has been successfully placed. We're preparing it for shipment</p>
                            <div className="paymentsuccess-boxbtn">
                                <button>Back to Home</button>
                                <button>Track Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}