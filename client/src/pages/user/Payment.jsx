// import React, { useState, useEffect } from "react";
// import './Product1.css'
// import './Payment.css'
// import { Link } from "react-router-dom";
// import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders, FiStar } from 'react-icons/fi'
// import homeperfume6 from "../../assets/homeperfume6.png"

// import UserService from "../../services/user-api-services/UserService";


// export const Payment = () => {

//     const { getaddress, getCarts } = UserService();

//     const [primaryAddress, setPrimaryAddressData] = useState(null);
//     const [addressLoading, setAddressLoading] = useState(true);


//     const getPrimaryAddress = async () => {
//         try {
//             setAddressLoading(true);

//             const data = await getaddress();
//             const addresses = data.addresses || [];

//             const primary = addresses.find(
//                 (address) => address.isDefault === true
//             );

//             setPrimaryAddressData(primary || null);
//         } catch (error) {
//             console.error(
//                 "Error fetching primary address:",
//                 error.response?.data || error.message
//             );

//             setPrimaryAddressData(null);
//         } finally {
//             setAddressLoading(false);
//         }
//     };

//     const [carts, setCarts] = useState([])
//     const fetchcarts = async () => {
//         try {
//             const res = await getCarts();

//             console.log("Cart response:", res);

//             setCarts(Array.isArray(res.cart) ? res.cart : []);
//         } catch (error) {
//             console.error(
//                 "Error fetching cart:",
//                 error.response?.data || error.message
//             );
//             setCarts([]);
//         }
//     };

//     // =========================total prize=====================

//     const totalItems = carts.reduce(
//         (total, item) => total + item.quantity,
//         0
//     );

//     const subtotal = carts.reduce(
//         (total, item) =>
//             total + Number(item.product?.product_price || 0) * item.quantity,
//         0
//     );

//     const totalDiscount = carts.reduce(
//         (total, item) => {
//             const originalPrice = Number(item.product?.product_price || 0);
//             const salePrice = Number(item.product?.sale_price || 0);

//             return total + Math.max(0, originalPrice - salePrice) * item.quantity;
//         },
//         0
//     );

//     const totalAmount = carts.reduce(
//         (total, item) =>
//             total + Number(item.product?.sale_price || 0) * item.quantity,
//         0
//     );

//     const deliveryCharge = totalAmount >= 999 || totalAmount === 0 ? 0 : 50;
//     const finalAmount = totalAmount + deliveryCharge;

//     const formatPrice = (price) =>
//         `Rs ${price.toLocaleString("en-IN", {
//             maximumFractionDigits: 2
//         })}`;


//     useEffect(() => {
//         getPrimaryAddress();
//         fetchcarts();
//     }, []);





//     return (
//         <div>
//             <div className="Product2-fullnav">
//                 <h2 id="nav-heading">Fragranzia</h2>
//                 <div className="home-fullnav1">
//                     <div className="home-nav">
//                         <nav>
//                             <ul>
//                                 <li><a href="">Home</a></li>
//                                 <li><a href="">Products</a></li>
//                                 <li><a href="">Gifting</a></li>
//                                 <li><a href="">About</a></li>
//                             </ul>
//                         </nav>
//                     </div>
//                     <div className="home-navsearch">
//                         <FiSearch />
//                         <input type="text" placeholder=" Search Here" />
//                     </div>
//                     <div className="home-navicons">
//                         <FiShoppingCart />
//                         <FiBell />
//                         <FiUser />
//                     </div>
//                 </div>
//             </div>

//             <br />


//             <div className="payment-container-top">
//                 <div className="cart-products">
//                     {carts.map((item) => {
//                         const product = item.product;

//                         if (!product) return null;

//                         return (
//                             <div
//                                 className="cart-item"
//                                 key={product._id}
//                             >
//                                 <div className="cart-image">
//                                     <img
//                                         src={`http://localhost:5000/uploads/${product.images}`}
//                                         alt={product.name}
//                                     />
//                                 </div>

//                                 <div className="cart-item-content">
//                                     <h2 className="cart-item-title">
//                                         {product.name}
//                                     </h2>

//                                     <p id="unique">Auograph</p>

//                                     <div className="cart-buttons-row">
//                                         <div className="cart-buttonsnew">

//                                             <span>{item.quantity}</span>

//                                         </div>
//                                     </div>

//                                     <div className="cart-price">
//                                         <strong className="cart-price-main">
//                                             Rs {product.sale_price}
//                                         </strong>

//                                         <del className="cart-price-old">
//                                             Rs {product.product_price}
//                                         </del>
//                                     </div>

//                                     <p id="unique">Delivered by August 29, Free delivery</p>
//                                     <p id="unique">7 day return policy</p>

//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* price details */}
//                 <div className="cart-checkout-full">
//                     <div className="cart-checkout">
//                         <h2>Price Details</h2>

//                         <div className="cart-checkout-row">
//                             <span>Price ({totalItems} items)</span>
//                             <span className="cart-checkout-val-dark">
//                                 {formatPrice(subtotal)}
//                             </span>
//                         </div>

//                         <div className="cart-checkout-row">
//                             <span>Discount</span>
//                             <span className="checkout-val-dark">
//                                 - {formatPrice(totalDiscount)}
//                             </span>
//                         </div>

//                         <div className="cart-checkout-row">
//                             <span>Delivery Charge</span>
//                             <span className="checkout-val-free">
//                                 {deliveryCharge === 0
//                                     ? "Free"
//                                     : formatPrice(deliveryCharge)}
//                             </span>
//                         </div>

//                         <hr className="cart-checkout-divider" />

//                         <div className="cart-checkout-total-row">
//                             <span>Total Amount</span>
//                             <span className="cart-checkout-val-total">
//                                 {formatPrice(finalAmount)}
//                             </span>
//                         </div>
//                     </div>



//                 </div>
//             </div>


//             <div className="payment-bottom">
//                 {/* personal details */}

//                 <div className="payment-personal-container">
//                     <h2 className="payment-personal-heading">Personal Details</h2>
//                     <div className="payment-personal-tabs">
//                         <button className="payment-personal-addbtn">Personal Details</button>
//                         <button className="payment-personal-tab payment-personal-active">Home</button>
//                         <button className="payment-personal-tab">Office</button>
//                         <button className="payment-personal-tab">Other</button>
//                     </div>
//                     <h2 className="payment-personal-address-heading">Address</h2>

//                     <div className="payment-personal-address-card-full">
//                         {addressLoading ? (
//                             <p>Loading primary address...</p>
//                         ) : primaryAddress ? (
//                             <div className="payment-personal-address-card">
//                                 <h3>{primaryAddress.fullName}</h3>

//                                 <p>
//                                     {primaryAddress.street}, {primaryAddress.city},{" "}
//                                     {primaryAddress.state}
//                                     {primaryAddress.landmark
//                                         ? `, Near ${primaryAddress.landmark}`
//                                         : ""}
//                                     {" "}- {primaryAddress.zip}, {primaryAddress.country}
//                                 </p>

//                                 <p>+91 {primaryAddress.phone}</p>

//                                 <span>
//                                     {primaryAddress.addressType || "Home"}
//                                     {" "}✓ Primary Address
//                                 </span>
//                             </div>
//                         ) : (
//                             <p>
//                                 No primary address found. Please set a primary address
//                                 in your Profile → Address section.
//                             </p>
//                         )}
//                     </div>

//                 </div>

//                 {/* payment methods */}
//                 <div className="payment-method-container">

//                     <h2 className="payment-method-heading">
//                         Payment Methods
//                     </h2>

//                     <div className="payment-method-options">

//                         <label className="payment-method-row">
//                             <span>Google Pay</span>
//                             <input
//                                 type="radio"
//                                 name="payment-method"
//                                 defaultChecked
//                             />
//                         </label>

//                         <label className="payment-method-row">
//                             <span>Cash on delivery (cash/UPI)</span>
//                             <input
//                                 type="radio"
//                                 name="payment-method"
//                             />
//                         </label>

//                         <label className="payment-method-row">
//                             <span>Paytm/Phone Pay/Amazon Pay etc</span>
//                             <input
//                                 type="radio"
//                                 name="payment-method"
//                             />
//                         </label>

//                         <label className="payment-method-row">
//                             <span>Credit/Debit card</span>
//                             <input
//                                 type="radio"
//                                 name="payment-method"
//                             />
//                         </label>

//                         <label className="payment-method-row">
//                             <span>Net Banking</span>
//                             <input
//                                 type="radio"
//                                 name="payment-method"
//                             />
//                         </label>

//                     </div>

//                     <button className="payment-method-paybtn">
//                         Pay Now
//                     </button>

//                 </div>

//             </div><br />

//         </div>
//     )
// }

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
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderMessage, setOrderMessage] = useState("");

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

        if (paymentMethod !== "cod") {
            setOrderMessage(
                "Please select Cash on Delivery."
            );
            return;
        }

        try {
            setPlacingOrder(true);

            const response = await placeOrder("cod");

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
                <div className="cart-checkout-full">
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

                    <div className="payment-personal-tabs">
                        <button
                            type="button"
                            className="payment-personal-addbtn"
                        >
                            Personal Details
                        </button>

                        <button
                            type="button"
                            className="payment-personal-tab payment-personal-active"
                        >
                            Home
                        </button>

                        <button
                            type="button"
                            className="payment-personal-tab"
                        >
                            Office
                        </button>

                        <button
                            type="button"
                            className="payment-personal-tab"
                        >
                            Other
                        </button>
                    </div>

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
                            <span>
                                Cash on Delivery (cash/UPI)
                            </span>

                            <input
                                type="radio"
                                name="payment-method"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Google Pay</span>
                           <input
                               type="radio"
                                name="payment-method"
                                defaultChecked
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Paytm/Phone Pay/Amazon Pay etc</span>
                           <input
                               type="radio"
                                name="payment-method"
                                defaultChecked
                            />
                        </label>

                        <label className="payment-method-row">
                            <span>Credit/Debit card</span>
                           <input
                               type="radio"
                                name="payment-method"
                                defaultChecked
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
