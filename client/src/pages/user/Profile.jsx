import React, { useState, useEffect } from "react";
import './Profile.css'
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import heroperfume from "../../assets/heroperfume.png"
import axios from 'axios'
import perfume from "../../assets/homeperfume3.png";

import UserService from "../../services/user-api-services/UserService";

export const Profile = () => {

    const [showProfileModal, setshowProfileModal] = useState(true);
    const [showEditModal, setshowEditModal] = useState(false);

    const [addressmodal, setAddressmodal] = useState(false);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressType, setAddressType] = useState("Home");

    const [showAddresseditModal, setshowAddresseditModal] = useState(false);

    const [showAddresseditsaveModal, setshowAddresseditsaveModal] = useState(false);

    const { getProfile, changeprofile, addaddress, getaddress, changeaddress, setPrimaryAddress, getOrders, cancelOrder, returnOrder } = UserService();

    const [activeTab, setActiveTab] = useState("profile");

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [loading, setLoading] = useState(true);
    const [profileError, setProfileError] = useState("");

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const data = await getProfile();

            setProfileData({
                name: data.user.name || "",
                email: data.user.email || "",
                phone: data.user.phone || "",
            });
        } catch (error) {
            console.error("Profile fetch error:", error);
            setProfileError("Unable to fetch profile details.");
        } finally {
            setLoading(false);
        }
    };



    const profilechange = async () => {
        try {
            const response = await changeprofile(
                profileData.name,
                profileData.email,
                profileData.password,
                profileData.phone
            );

            setProfileData({
                name: response.user.name,
                email: response.user.email,
                password: "",
                phone: response.user.phone,
            });

            setshowEditModal(false);
            setshowProfileModal(true);

            alert("Profile updated successfully!");
        } catch (error) {
            console.error(
                "Profile update error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };




    const [addressData, setAddressData] = useState({
        addressType: "Home",
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zip: "",
        alternatePhone: "",
        country: "India",
    });

    const handleAddressChange = (field, value) => {
        setAddressData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };




    const addtoaddress = async () => {
        try {
            const response = await addaddress(addressData);
            await fetchaddress();

            alert(response.message);

            // Clear the form after successful saving
            setAddressData({
                addressType: "Home",
                fullName: "",
                phone: "",
                street: "",
                city: "",
                state: "",
                landmark: "",
                zip: "",
                alternatePhone: "",
                country: "India",
            });

            setAddressType("Home");
            setShowAddressModal(false);
        } catch (error) {
            console.error(
                "Address save error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to save address"
            );
        }
    };

    const [addresses, setAddresses] = useState([]);
    const [addressLoading, setAddressLoading] = useState(true);


    const fetchaddress = async () => {
        try {
            setAddressLoading(true);

            const res = await getaddress();

            setAddresses(res.addresses || []);
        } catch (error) {
            console.error(
                "Fetch address error:",
                error.response?.data || error.message
            );
        } finally {
            setAddressLoading(false);
        }
    };

    const [selectedAddressId, setSelectedAddressId] = useState(null);


    const updateaddress = async () => {
        try {
            if (!selectedAddressId) {
                alert("Please select an address to update.");
                return;
            }

            const response = await changeaddress(
                selectedAddressId,
                addressData
            );

            await fetchaddress();

            alert(response.message || "Address updated successfully");

            setshowAddresseditsaveModal(false);
            setSelectedAddressId(null);
        } catch (error) {
            console.error(
                "Update address error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update address"
            );
        }
    };

    // set primary============
    const handleSetPrimary = async (addressId) => {
        try {
            const response = await setPrimaryAddress(addressId);

            // Fetch the latest addresses from MongoDB
            await fetchaddress();

            alert(response.message || "Primary address updated successfully");
        } catch (error) {
            console.error(
                "Set primary address error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to set primary address"
            );
        }
    };

    const [showorders, setshoworders] = useState(false);


    //const [showorders, setshoworders] = useState(false);
    const [displayorder, setdisplayorder] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState("");


    const fetchorder = async () => {
        try {
            setOrderLoading(true);
            setOrderError("");

            const response = await getOrders();

            console.log("ORDERS RESPONSE:", response);

            // Supports both backend response formats:
            // 1. An array: [...]
            // 2. An object: { orders: [...] }
            const orders = Array.isArray(response)
                ? response
                : Array.isArray(response?.orders)
                    ? response.orders
                    : [];

            setdisplayorder(orders);

        } catch (error) {
            console.error(
                "Fetch order error:",
                error.response?.data || error.message
            );

            setOrderError(
                error.response?.data?.message ||
                "Unable to fetch your orders."
            );
        } finally {
            setOrderLoading(false);
        }
    };


    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedCancelOrder, setSelectedCancelOrder] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    const openCancelModal = (order) => {
        setSelectedCancelOrder(order);
        setShowCancelModal(true);
    };

    const handleCancelOrder = async () => {
        if (!selectedCancelOrder) return;

        try {
            setCancelLoading(true);

            await cancelOrder(selectedCancelOrder._id);

            setShowCancelModal(false);
            setSelectedCancelOrder(null);

            await fetchorder();

            alert("Order cancelled successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to cancel order."
            );
        } finally {
            setCancelLoading(false);
        }
    };


    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedReturnOrder, setSelectedReturnOrder] = useState(null);
    const [returnReason, setReturnReason] = useState("");
    const [returnLoading, setReturnLoading] = useState(false);

    const returnReasons = [
        "Damaged Product",
        "Wrong Item Received",
        "Defective Product",
        "Item Not as Described",
        "Size/Color Mismatch",
        "Other"
    ];

    const openReturnModal = (order) => {
        setSelectedReturnOrder(order);
        setReturnReason("");
        setShowReturnModal(true);
    };

    const handleReturnOrder = async () => {
        if (!selectedReturnOrder || !returnReason) {
            alert("Please select a reason for returning the order.");
            return;
        }

        try {
            setReturnLoading(true);

            await returnOrder(selectedReturnOrder._id, returnReason);

            setShowReturnModal(false);
            setSelectedReturnOrder(null);
            setReturnReason("");

            await fetchorder();

            alert("Return request submitted successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit return request."
            );
        } finally {
            setReturnLoading(false);
        }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/Login");
    };


    useEffect(() => {
        fetchProfile();
        fetchaddress();
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


            {/* ===========profile========== */}

            <div className="Profile-belownav">
                <h1>Profile</h1>
                <p>Home   ›   Profile</p>
            </div>

            {/* ================button================ */}
            <div className="profile-buttons">
                {/* <button id="profile-buttons1" onClick={() => { setshowProfileModal(true); setAddressmodal(false); setshoworders(false); setshowEditModal(false); }}>Profile</button>
                <button id="profile-buttons2" onClick={() => { setAddressmodal(true); setshowProfileModal(false); setshowEditModal(false); setshoworders(false); }}>Address</button>
                <button id="profile-buttons3" onClick={() => { setshoworders(true); setshowProfileModal(false); setshowEditModal(false); setAddressmodal(false); setShowAddressModal(false); fetchorder(); }}>My Orders</button> */}
                <div className="profile-buttons">

                    <button
                        id="profile-buttons1"
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("profile");
                            setshowProfileModal(true);
                            setAddressmodal(false);
                            setshoworders(false);
                            setshowEditModal(false);
                        }}
                    >
                        Profile
                    </button>

                    <button
                        id="profile-buttons2"
                        className={activeTab === "address" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("address");
                            setAddressmodal(true);
                            setshowProfileModal(false);
                            setshowEditModal(false);
                            setshoworders(false);
                        }}
                    >
                        Address
                    </button>

                    <button
                        id="profile-buttons3"
                        className={activeTab === "orders" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("orders");
                            setshoworders(true);
                            setshowProfileModal(false);
                            setshowEditModal(false);
                            setAddressmodal(false);
                            setShowAddressModal(false);
                            fetchorder();
                        }}
                    >
                        My Orders
                    </button>
                    

                </div>

            </div>


            {/* =========================form================ */}
            {showProfileModal && (
                <div>
                    <div className="profile-buttons1">
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                    <form action="" className="profile-fullform">
                        <div className="profile-sections">
                            <div className="profile-inputs">
                                <label htmlFor="">Fullname</label><br />
                                <input type="text" value={loading ? "Loading..." : profileData.name} readOnly />
                            </div>
                            <div className="profile-inputs">
                                <label htmlFor="">Email</label><br />
                                <input type="email" value={loading ? "Loading..." : profileData.email} readOnly />
                            </div>
                            <div className="profile-inputs">
                                <label htmlFor="">Phone Number</label><br />
                                <input type="number" value={loading ? "Loading..." : profileData.phone} readOnly />
                            </div>
                        </div>
                        <div className="profile-sections">
                            <div className="profile-inputs">
                                <label htmlFor="">Date of Birth</label><br />
                                <input type="text" />
                            </div>
                            <div className="profile-inputs">
                                <label htmlFor="">Gender</label><br />
                                <input type="text" />
                            </div>
                            <div className="profile-inputs">
                                <label htmlFor="">Password</label><br />
                                <input type="password" value="••••••••" readOnly />
                            </div>
                        </div>
                    </form>

                    <div className="profile-editbtn">
                        <button onClick={() => { setshowEditModal(true), setshowProfileModal(false) }}>Edit</button>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div>
                    <form action="" className="profile-fullform1">
                        <div className="profile-sections1">
                            {/* <div className="profile-inputs1">
                                <label htmlFor="">Fullname</label><br />
                                <input type="text" value={loading ? "Loading..." : profileData.name} onChange={(e)=>{setProfileData(e.target.value)}}/>
                            </div> */}
                            {/* Fullname */}
                            <div className="profile-inputs1">
                                <label htmlFor="">Fullname</label><br />
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Email */}
                            <div className="profile-inputs1">
                                <label htmlFor="">Email</label><br />
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {/* <div className="profile-inputs1">
                                <label htmlFor="">Email</label><br />
                                <input type="email" value={loading ? "Loading..." : profileData.email} onChange={(e) => { setProfileData(e.target.value) }} />
                            </div> */}
                            <div className="profile-inputs1">
                                <label htmlFor="">Phone Number</label><br />
                                <input type="number"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            phone: e.target.value,
                                        })
                                    } />
                            </div>
                        </div>
                        <div className="profile-sections1">
                            <div className="profile-inputs1">
                                <label htmlFor="">Date of Birth</label><br />
                                <input type="text" />
                            </div>
                            <div className="profile-inputs1">
                                <label htmlFor="">Gender</label><br />
                                <input type="text" />
                            </div>
                            <div className="profile-inputs1">
                                <label htmlFor="">Password</label><br />
                                <input type="password" value="••••••••" />
                            </div>
                        </div>
                    </form>

                    <div className="profile-editbtn1">
                        <button type="button" onClick={profilechange}>
                            Save
                        </button>
                    </div>

                </div>
            )}



            {addressmodal && (
                <div className="profile-address-list">
                    {addressLoading ? (
                        <p>Loading addresses...</p>
                    ) : addresses.length === 0 ? (
                        <p>No saved addresses. Click Add Address to add one.</p>
                    ) : (
                        addresses.map((address, index) => (
                            <div
                                className="profile-addressmodal"
                                key={address._id}
                            >
                                <div className="profile-address-header">
                                    <h3 id="profile-addressh3">
                                        Address {index + 1}
                                    </h3>

                                    {/* <button
                                        id="profile-address-office"
                                        type="button"
                                    >
                                        {address.addressType || "Home"}
                                    </button> */}

                                    <button
                                        id="profile-address-edit"
                                        type="button"
                                        onClick={() => {
                                            setSelectedAddressId(address._id);

                                            setAddressData({
                                                addressType: address.addressType || "Home",
                                                fullName: address.fullName || "",
                                                phone: address.phone || "",
                                                street: address.street || "",
                                                city: address.city || "",
                                                state: address.state || "",
                                                landmark: address.landmark || "",
                                                zip: address.zip || "",
                                                alternatePhone: address.alternatePhone || "",
                                                country: address.country || "India",
                                            });


                                            setAddressType(address.addressType || "Home");
                                            setshowAddresseditModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSetPrimary(address._id)}
                                        disabled={address.isDefault}
                                        id="profile-primarybtn"
                                    >
                                        {address.isDefault
                                            ? "Primary Address ✓"
                                            : "Set Primary Address"}
                                    </button>
                                </div>

                                <p id="profile-address-name">
                                    {address.fullName}
                                </p>

                                <p className="profile-address">
                                    {address.street}, {address.city},
                                    {" "}{address.state}
                                    {address.landmark
                                        ? `, Near ${address.landmark}`
                                        : ""}
                                    {" "}- {address.zip}, {address.country}
                                </p>

                                <p className="profile-address">
                                    ☎ {address.phone}
                                </p>

                                {address.alternatePhone && (
                                    <p className="profile-address">
                                        Alternative phone: {address.alternatePhone}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}


            {addressmodal && (<button onClick={() => setShowAddressModal(true)} id="profile-addaddressbtn">Add Address</button>)}




            {showAddressModal && (
                <div
                    className="address-modal-overlay"
                    onClick={() => setShowAddressModal(false)}
                >
                    <div
                        className="address-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Address Type */}
                        <div className="address-type-section">
                            <label>Address Type</label>

                            <div className="address-type-options">
                                {["Home", "Office", "Other"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`address-type-btn ${addressType === type ? "selected" : ""
                                            }`}
                                        onClick={() => {
                                            setAddressType(type);
                                            handleAddressChange("addressType", type);
                                        }}
                                    >
                                        {type === "Home" ? "⌂ " : ""}
                                        {type === "Office" ? "▣ " : ""}
                                        {type === "Other" ? "▤ " : ""}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addtoaddress();
                            }}
                        >
                            {/* Full Name and Phone */}
                            <div className="address-form-grid two-columns">
                                <div className="address-form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        value={addressData.fullName}
                                        onChange={(e) =>
                                            handleAddressChange("fullName", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit mobile number"
                                        value={addressData.phone}
                                        onChange={(e) =>
                                            handleAddressChange("phone", e.target.value)
                                        }
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Street Address */}
                            <div className="address-form-group full-width">
                                <label>Address</label>
                                <textarea
                                    placeholder="Enter house or building details"
                                    value={addressData.street}
                                    onChange={(e) =>
                                        handleAddressChange("street", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* City, State and Landmark */}
                            <div className="address-form-grid three-columns">
                                <div className="address-form-group">
                                    <label>City/District</label>
                                    <input
                                        type="text"
                                        placeholder="Enter city/district"
                                        value={addressData.city}
                                        onChange={(e) =>
                                            handleAddressChange("city", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        placeholder="Enter state"
                                        value={addressData.state}
                                        onChange={(e) =>
                                            handleAddressChange("state", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Land Mark</label>
                                    <input
                                        type="text"
                                        placeholder="Enter landmark"
                                        value={addressData.landmark}
                                        onChange={(e) =>
                                            handleAddressChange("landmark", e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* PIN and Alternative Phone */}
                            <div className="address-form-grid two-columns">
                                <div className="address-form-group">
                                    <label>PinCode</label>
                                    <input
                                        type="text"
                                        placeholder="Enter PIN code"
                                        value={addressData.zip}
                                        onChange={(e) =>
                                            handleAddressChange("zip", e.target.value)
                                        }
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Alternative Phone number (Optional)</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter alternate phone number"
                                        value={addressData.alternatePhone}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "alternatePhone",
                                                e.target.value
                                            )
                                        }
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="address-modal-footer">
                                <button
                                    type="submit"
                                    className="save-address-btn"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {showAddresseditModal && (
                <div
                    className="address-modal-overlayedit"
                    onClick={() => setShowAddressModal(false)}
                >
                    <div
                        className="address-modaledit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="address-type-sectionedit">
                            <label>Address Type</label>

                            <div className="address-type-optionsedit">
                                {["Home", "Office", "Other"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`address-type-btnedit ${addressType === type ? "selected" : ""
                                            }`}
                                        onClick={() => setAddressType(type)}
                                    >
                                        {type === "Home" ? "⌂ " : ""}
                                        {type === "Office" ? "▣ " : ""}
                                        {type === "Other" ? "▤ " : ""}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Address type:", addressType);
                                setShowAddressModal(false);
                            }}
                        >
                            <div className="address-form-grid two-columnsedit">
                                <div className="address-form-groupedit">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        value={addressData.fullName}
                                        readOnly
                                    />
                                </div>

                                <div className="address-form-groupedit">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit mobile number"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        value={addressData.phone}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="address-form-groupedit full-widthedit">
                                <label>Address</label>
                                <textarea
                                    placeholder="Enter house or building details"
                                    value={addressData.street}
                                    readOnly
                                />
                            </div>

                            <div className="address-form-grid three-columnsedit">
                                <div className="address-form-groupedit">
                                    <label>City/District</label>
                                    <input
                                        type="text"
                                        placeholder="Enter city/district"
                                        value={addressData.city}
                                        readOnly
                                    />
                                </div>

                                <div className="address-form-groupedit">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        placeholder="Enter state"
                                        value={addressData.state}
                                        readOnly
                                    />
                                </div>

                                <div className="address-form-groupedit">
                                    <label>Land Mark</label>
                                    <input
                                        type="text"
                                        placeholder="Enter landmark"
                                        value={addressData.landmark}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="address-form-grid two-columnsedit">
                                <div className="address-form-groupedit">
                                    <label>PinCode</label>
                                    <input
                                        type="text"
                                        placeholder="Enter PIN code"
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        value={addressData.zip}
                                        readOnly
                                    />
                                </div>

                                <div className="address-form-groupedit">
                                    <label>Alternative Phone number (Optional)</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter alternate phone number"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        value={addressData.alternatePhone}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="address-modal-footeredit">
                                <button type="submit" className="save-address-btn" onClick={() => setshowAddresseditsaveModal(true)}>
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {showAddresseditsaveModal && (
                <div
                    className="address-modal-overlay"
                    onClick={() => setshowAddresseditsaveModal(false)}
                >
                    <div
                        className="address-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="address-type-section">
                            <label>Address Type</label>

                            <div className="address-type-options">
                                {["Home", "Office", "Other"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`address-type-btn ${addressData.addressType === type
                                            ? "selected"
                                            : ""
                                            }`}
                                        onClick={() => {
                                            setAddressType(type);
                                            handleAddressChange("addressType", type);
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateaddress();
                            }}
                        >
                            <div className="address-form-grid two-columns">
                                <div className="address-form-group">
                                    <label>Full Name</label>
                                    <input
                                        value={addressData.fullName}
                                        onChange={(e) =>
                                            handleAddressChange("fullName", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={addressData.phone}
                                        onChange={(e) =>
                                            handleAddressChange("phone", e.target.value)
                                        }
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="address-form-group full-width">
                                <label>Address</label>
                                <textarea
                                    value={addressData.street}
                                    onChange={(e) =>
                                        handleAddressChange("street", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="address-form-grid three-columns">
                                <div className="address-form-group">
                                    <label>City/District</label>
                                    <input
                                        value={addressData.city}
                                        onChange={(e) =>
                                            handleAddressChange("city", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>State</label>
                                    <input
                                        value={addressData.state}
                                        onChange={(e) =>
                                            handleAddressChange("state", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Landmark</label>
                                    <input
                                        value={addressData.landmark}
                                        onChange={(e) =>
                                            handleAddressChange("landmark", e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="address-form-grid two-columns">
                                <div className="address-form-group">
                                    <label>PIN Code</label>
                                    <input
                                        value={addressData.zip}
                                        onChange={(e) =>
                                            handleAddressChange("zip", e.target.value)
                                        }
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <div className="address-form-group">
                                    <label>Alternative Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        value={addressData.alternatePhone}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "alternatePhone",
                                                e.target.value
                                            )
                                        }
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                    />
                                </div>
                            </div>

                            <div className="address-modal-footer">
                                <button type="submit" className="save-address-btn">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {showorders && (
                <div className="profile-orders-container">

                    {orderLoading ? (
                        <p>Loading your orders...</p>
                    ) : orderError ? (
                        <p>{orderError}</p>
                    ) : displayorder.length === 0 ? (
                        <p>You have not placed any orders yet.</p>
                    ) : (
                        displayorder.map((order) => (
                            <div
                                className="profile-order"
                                key={order._id}
                            >
                                <div className="profile-orderidbtn">
                                    <p>
                                        Order ID: #{order._id.slice(-8).toUpperCase()}
                                    </p>

                                    <div className="profile-order-id-buttons">
                                        <button type="button">
                                            {order.deliveryStatus || "Pending"}
                                        </button>

                                        {!["Cancelled", "Returned"].includes(order.deliveryStatus) && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (order.deliveryStatus === "Delivered") {
                                                        openReturnModal(order);
                                                    } else {
                                                        openCancelModal(order);
                                                    }
                                                }}
                                            >
                                                {order.deliveryStatus === "Delivered" ? "Return" : "Cancel"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <p>
                                    Order Date:{" "}
                                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                </p>

                                <p>
                                    Payment: {order.paymentMethod === "cod"
                                        ? "Cash on Delivery"
                                        : order.paymentMethod}
                                </p>

                                <p>
                                    Payment Status: {order.paymentStatus}
                                </p>

                                {order.orderItems?.map((item, index) => {
                                    const product = item.product;

                                    if (!product) {
                                        return (
                                            <div key={item._id || index}>
                                                Product details unavailable
                                            </div>
                                        );
                                    }

                                    const imageName = Array.isArray(product.images)
                                        ? product.images[0]
                                        : product.images;

                                    return (
                                        <div
                                            className="profile-order-item"
                                            key={item._id || product._id || index}
                                        >
                                            {imageName && (
                                                <img
                                                    src={imageName}
                                                    alt={product.name || "Product"}
                                                />
                                            )}

                                            <div className="profile-order-item-property">
                                                <h3>
                                                    {product.name || "Product"}
                                                </h3>

                                                <p>Qty: {item.quantity}</p>

                                                <p>
                                                    Price: ₹
                                                    {Number(
                                                        product.sale_price || 0
                                                    ).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="profile-order-total">
                                    <h3>
                                        Total: ₹
                                        {Number(order.totalPrice || 0).toLocaleString("en-IN")}
                                    </h3>
                                </div>

                                <hr />
                            </div>
                        ))
                    )}
                </div>
            )}


            {showCancelModal && selectedCancelOrder && (
                <div
                    className="cancel-modal-overlay"
                    onClick={() => {
                        if (!cancelLoading) {
                            setShowCancelModal(false);
                            setSelectedCancelOrder(null);
                        }
                    }}
                >
                    <div
                        className="cancel-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cancel-modal-icon">
                            !
                        </div>

                        <h2>Cancel Order?</h2>

                        <p>Do you want to cancel this product?</p>

                        <div className="cancel-product-list">
                            {selectedCancelOrder.orderItems?.map((item, index) => (
                                <div
                                    className="cancel-product-item"
                                    key={item._id || index}
                                >
                                    {item.product?.images && (
                                        <img
                                            src={`${Array.isArray(item.product.images)
                                                ? item.product.images[0]
                                                : item.product.images
                                                }`}
                                            alt={item.product?.name || "Product"}
                                        />
                                    )}

                                    <div>
                                        <h4>
                                            {item.product?.name || "Product"}
                                        </h4>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="cancel-modal-warning">
                            This action cannot be undone.
                        </p>

                        <div className="cancel-modal-actions">
                            <button
                                type="button"
                                className="cancel-modal-keep"
                                disabled={cancelLoading}
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setSelectedCancelOrder(null);
                                }}
                            >
                                Keep Order
                            </button>

                            <button
                                type="button"
                                className="cancel-modal-confirm"
                                disabled={cancelLoading}
                                onClick={handleCancelOrder}
                            >
                                {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReturnModal && selectedReturnOrder && (
                <div
                    className="return-modal-overlay"
                    onClick={() => {
                        if (!returnLoading) {
                            setShowReturnModal(false);
                            setSelectedReturnOrder(null);
                        }
                    }}
                >
                    <div
                        className="return-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="return-modal-icon">↩</div>

                        <h2>Return Order</h2>

                        <p className="return-modal-description">
                            Please select a reason for returning your order.
                        </p>

                        <div className="return-product-list">
                            {selectedReturnOrder.orderItems?.map((item, index) => {
                                const product = item.product;

                                const imageName = Array.isArray(product?.images)
                                    ? product.images[0]
                                    : product?.images;

                                return (
                                    <div
                                        className="return-product-item"
                                        key={item._id || index}
                                    >
                                        {imageName && (
                                            <img
                                                src={`http://localhost:5000/uploads/${imageName}`}
                                                alt={product?.name || "Product"}
                                            />
                                        )}

                                        <div>
                                            <h4>{product?.name || "Product"}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="return-reason-section">
                            <label htmlFor="returnReason">
                                Reason for Return <span>*</span>
                            </label>

                            <select
                                id="returnReason"
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                                required
                            >
                                <option value="">Select a reason</option>

                                {returnReasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="return-modal-warning">
                            Please check your selection before submitting.
                        </p>

                        <div className="return-modal-actions">
                            <button
                                type="button"
                                className="return-modal-back"
                                disabled={returnLoading}
                                onClick={() => {
                                    setShowReturnModal(false);
                                    setSelectedReturnOrder(null);
                                    setReturnReason("");
                                }}
                            >
                                Go Back
                            </button>

                            <button
                                type="button"
                                className="return-modal-submit"
                                disabled={returnLoading || !returnReason}
                                onClick={handleReturnOrder}
                            >
                                {returnLoading ? "Submitting..." : "Submit Return"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )


}