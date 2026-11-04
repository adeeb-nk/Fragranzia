

import React, { useState, useEffect } from "react";
import "./Product1.css";
import "./Payment.css";
import { Link } from "react-router-dom";
import {
    FiShoppingCart,
    FiBell,
    FiUser,
    FiSearch
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import UserService from "../../services/user-api-services/UserService";

export const Payment = () => {
    const {
        getaddress,
        getCarts,
        placeOrder
    } = UserService();

    const [primaryAddress, setPrimaryAddressData] = useState(null);
    const [addressLoading, setAddressLoading] = useState(true);

    const [carts, setCarts] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderMessage, setOrderMessage] = useState("");

    // const [selectedPaymentMehod,setselectedPaymentMehod] = useState()

    const navigate=useNavigate();
    // Fetch the primary address
    const getPrimaryAddress = async () => {
        try {
            setAddressLoading(true);

            const data = await getaddress();
            const addresses = data.addresses || [];

            const primary = addresses.find(
                (address) => address.isDefault === true
            );

            setPrimaryAddressData(primary || null);
        } catch (error) {
            console.error(
                "Error fetching primary address:",
                error.response?.data || error.message
            );

            setPrimaryAddressData(null);
        } finally {
            setAddressLoading(false);
        }
    };

    // Fetch cart products
    const fetchcarts = async () => {
        try {
            const response = await getCarts();

            console.log("Cart response:", response);

            setCarts(
                Array.isArray(response.cart)
                    ? response.cart
                    : []
            );
        } catch (error) {
            console.error(
                "Error fetching cart:",
                error.response?.data || error.message
            );

            setCarts([]);
        }
    };

    // Price calculations
    const totalItems = carts.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const subtotal = carts.reduce(
        (total, item) =>
            total +
            Number(item.product?.product_price || 0) *
            Number(item.quantity || 0),
        0
    );

    const totalDiscount = carts.reduce(
        (total, item) => {
            const originalPrice = Number(
                item.product?.product_price || 0
            );

            const salePrice = Number(
                item.product?.sale_price || 0
            );

            return (
                total +
                Math.max(0, originalPrice - salePrice) *
                Number(item.quantity || 0)
            );
        },
        0
    );

    const totalAmount = carts.reduce(
        (total, item) =>
            total +
            Number(item.product?.sale_price || 0) *
            Number(item.quantity || 0),
        0
    );

    const deliveryCharge =
        totalAmount >= 999 || totalAmount === 0
            ? 0
            : 50;

    const finalAmount = totalAmount + deliveryCharge;

    const formatPrice = (price) =>
        `Rs ${price.toLocaleString("en-IN", {
            maximumFractionDigits: 2
        })}`;

    useEffect(() => {
        getPrimaryAddress();
        fetchcarts();
    }, []);

    // Place order
    const handlePlaceOrder = async () => {
        setOrderMessage("");

        if (!primaryAddress?._id) {
            setOrderMessage(
                "Please set a primary address first."
            );
            return;
        }

        if (carts.length === 0) {
            setOrderMessage("Your cart is empty.");
            return;
        }

        // if (paymentMethod !== "cod") {
        //     setOrderMessage(
        //         "Please select Cash on Delivery."
        //     );
        //     return;
        // }

        try {
            setPlacingOrder(true);

            const response = await placeOrder(paymentMethod);

            if (response?.success) {

                if (response?.paymentMethod == "UPI") {
                    console.log("Razorpay Order =========  ", response?.razorpayOrder);
                    await handlePayment(response?.razorpayOrder);
                } else {
                    console.log("COD Order =========  ", response);

                    navigate("/Paymentsuccess");
                }
            }
            else {
                toast.error(response?.message);
            }


            setOrderMessage(
                response.message ||
                "Order placed successfully!"
            );

            // Refresh cart after successful order
            await fetchcarts();

        } catch (error) {
            console.error(
                "Order placement error:",
                error.response?.data || error.message
            );

            setOrderMessage(
                error.response?.data?.message ||
                "Unable to place order. Please try again."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    

//     const handlePayment = async (data) => {
//     try {
//       console.log("==== handlePayment 1");

//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         alert(
//           "Failed to load Razorpay SDK. Please check your internet connection."
//         );
//         return;
//       }

//       console.log("==== handlePayment 2");


//       // Initialize Razorpay
//       const options = {
//         key: "rzp_test_TtcgxkiZwyZJ7b", // Replace with Razorpay Key ID
//         amount: data.amount,
//         currency: "INR",
//         name: "Cart7",
//         description: "Purchase Description",
//         order_id: data.id,
//         //handler: async function (response) {

//         //   const verifyRes = await axios.post('http://localhost:5000/order/payment/verify-payment', {
//         //     razorpay_order_id: response.razorpay_order_id,
//         //     razorpay_payment_id: response.razorpay_payment_id,
//         //     razorpay_signature: response.razorpay_signature,
//         //   });

//         //   if (verifyRes.data.success) {
//         //     console.log("inside verifyRes.data.success");

//         //     //  navigate("/order-success");
//         //   } else {
//         //     alert("Payment Failed!");
//         //     console.log("elseeeeee");

//         //   }

//         //},

//         // prefill: {
//         //   name: "John Doe",
//         //   email: "johndoe@example.com",
//         //   contact: "9999999999",
//         // },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Error:--------------", error);
//     }
//   };

const handlePayment = async (data) => {
    try {
        console.log("==== handlePayment 1");

        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            alert("Failed to load Razorpay SDK. Please check your internet connection.");
            return;
        }

        console.log("==== handlePayment 2");

        const options = {
            key: "rzp_test_TtcgxkiZwyZJ7b",
            amount: data.amount,
            currency: data.currency || "INR",
            name: "Fragranzia",
            description: "Purchase Description",
            order_id: data.id,
            handler: async function (response) {

//         //   if (verifyRes.data.success) {
//         //     console.log("inside verifyRes.data.success");

             navigate("/Paymentsuccess");},

            prefill: {
                name: primaryAddress?.fullName || "",
                contact: primaryAddress?.phone || ""
            },

            theme: {
                color: "#003b4d"
            }
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            console.log("Payment Failed:", response.error);
            alert(response.error.description);
        });

        rzp1.open();

    } catch (error) {
        console.error("Payment Error:", error);
    }
};





  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


    return (
        <div>
            {/* Navigation */}
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
                        <input
                            type="text"
                            placeholder="Search Here"
                        />
                    </div>

                    <div className="home-navicons">
                        <Link to="/Cart"><FiShoppingCart /></Link>
                        <FiBell />
                        <Link to="/Profile"><FiUser /></Link>
                    </div>
                </div>
            </div>

            <br />

            {/* Products and price details */}
            <div className="payment-container-top">
                <div className="payment-cart-products">
                    {carts.map((item, index) => {
                        const product = item.product;

                        if (!product) return null;

                        return (
                            <div
                                className="cart-item"
                                key={item._id || product._id || index}
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

                                    <p id="unique">Auograph</p>

                                    <div className="cart-buttons-row">
                                        <div className="cart-buttonsnew">
                                            <span>{item.quantity}</span>
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

                                    <p id="unique">
                                        Delivered by August 29, Free delivery
                                    </p>

                                    <p id="unique">
                                        7 day return policy
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {carts.length === 0 && (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Price details */}
                <div className="payment-cart-checkout-full">
                    <div className="cart-checkout">
                        <h2>Price Details</h2>

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
                </div>
            </div>

            {/* Address and payment */}
            <div className="payment-bottom">
                <div className="payment-personal-container">
                    <h2 className="payment-personal-heading">
                        Personal Details
                    </h2>


                    <h2 className="payment-personal-address-heading">
                        Address
                    </h2>

                    <div className="payment-personal-address-card-full">
                        {addressLoading ? (
                            <p>Loading primary address...</p>
                        ) : primaryAddress ? (
                            <div className="payment-personal-address-card">
                                <h3>{primaryAddress.fullName}</h3>

                                <p>
                                    {primaryAddress.street},{" "}
                                    {primaryAddress.city},{" "}
                                    {primaryAddress.state}
                                    {primaryAddress.landmark
                                        ? `, Near ${primaryAddress.landmark}`
                                        : ""}
                                    {" "}- {primaryAddress.zip},{" "}
                                    {primaryAddress.country}
                                </p>

                                <p>+91 {primaryAddress.phone}</p>

                                <span>
                                    {primaryAddress.addressType || "Home"}
                                    {" "}✓ Primary Address
                                </span>
                            </div>
                        ) : (
                            <p>
                                No primary address found. Please set a
                                primary address in your Profile →
                                Address section.
                            </p>
                        )}
                    </div>
                </div>

                {/* Payment methods */}
                <div className="payment-method-container">
                    <h2 className="payment-method-heading">
                        Payment Methods
                    </h2>

                    <div className="payment-method-options">

    <label className="payment-method-row">
        <span>Cash on Delivery (cash)</span>
        <input
            type="radio"
            name="payment-method"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
        />
    </label>

    <label className="payment-method-row">
        <span>Google Pay (UPI)</span>
        <input
            type="radio"
            name="payment-method"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
        />
    </label>

    <label className="payment-method-row">
        <span>PhonePe / Amazon Pay</span>
        <input
            type="radio"
        />
    </label>

    <label className="payment-method-row">
        <span>Debit / Credit card</span>
        <input
            type="radio"
        />
    </label>

    <label className="payment-method-row">
        <span>Net Banking</span>
        <input
            type="radio"
        />
    </label>

</div>

                    <button
                        className="payment-method-paybtn"
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={
                            placingOrder ||
                            addressLoading ||
                            !primaryAddress ||
                            carts.length === 0
                        }
                    >
                        {placingOrder
                            ? "Placing Order..."
                            : "Pay Now"}
                    </button>

                    {orderMessage && (
                        <p
                            className="order-message"
                            role="status"
                        >
                            {orderMessage}
                        </p>
                    )}
                </div>
            </div>

            <br />
        </div>
    );
};

export default Payment;
