import "./Order.css"
import { Link,useNavigate } from "react-router-dom";
import {
    FiGrid,
    FiPackage,
    FiTag,
    FiUsers,
    FiShoppingCart,
    FiHome,
    FiBox,
    FiEye,
    FiFileText,
    FiCopy,
    FiCalendar,
    FiPhone,
    FiUser,
    FiMail,
    FiMapPin,
    FiCreditCard,
    FiX,
    FiLogOut
} from "react-icons/fi";
import {
    MdDashboard,
    MdInventory2,
    MdCategory,
    MdLocalOffer,
    MdPeople,
    MdShoppingCart,
    MdLogout
} from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import './Order.css'
import axios from "axios";
import homeperfume3 from "../../assets/homeperfume3.png"
import { useEffect, useState } from "react";

import AdminService from "../../services/admin-api-services/AdminService";

export const Order = () => {
    const [showdeatils, setshowdetails] = useState(false)

    const { getOrder, updateOrderStatus } = AdminService();

    const [getorders, setgetorders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    
const fetchorders = async () => {
    try {
        const res = await getOrder();

        console.log("Fetched orders:", res);

        setgetorders(Array.isArray(res) ? res : []);
    } catch (error) {
        console.error(
            "Error fetching orders:",
            error.response?.data || error
        );

        setgetorders([]);
    }
};



    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);

            setgetorders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, deliveryStatus: newStatus }
                        : order
                )
            );

            // Keep the modal status in sync if this order is open
            setSelectedOrder((prev) =>
                prev && prev._id === orderId
                    ? { ...prev, deliveryStatus: newStatus }
                    : prev
            );
        } catch (error) {
            console.error(
                "Failed to update order status:",
                error.response?.data || error
            );

            alert("Failed to update status. Please try again.");
        }
    };

    const navigate = useNavigate();
        
        const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        
            navigate("/Login");
        };


    useEffect(() => {
        fetchorders();
    }, []);

    return (
        <div className="orderdetails">

            

            <div className="ordertable">
                <h1><FiBox />Order Management</h1>
                <p>Monitor,track and update customer order dynamically</p>

                <div className="ordertablecontent">
                    <table>
                        <thead>

                            <tr>
                                <th>ORDER ID</th>
                                <th>CUSTOMER</th>
                                <th>DATE</th>
                                <th>PRODUCTDETAILS</th>
                                <th>ACTION</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getorders.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No orders found</td>
                                </tr>
                            ) : (
                                getorders.map((value) => (
                                    <tr key={value._id}>
                                        {/* ORDER ID */}
                                        <td>
                                            #{value._id.slice(-8).toUpperCase()}
                                            <FiCopy
                                                style={{ cursor: "pointer", marginLeft: "6px" }}
                                                onClick={() =>
                                                    navigator.clipboard.writeText(value._id)
                                                }
                                            />
                                        </td>

                                        {/* CUSTOMER */}
                                        <td>
                                            <span5>
                                                {value.user?.name ||
                                                    value.user?.username ||
                                                    "Customer"}
                                            </span5>
                                            <h5>
                                                <FiPhone /> {value.user?.phone || "N/A"}
                                            </h5>
                                        </td>

                                        {/* DATE */}
                                        <td>
                                            <FiCalendar />
                                            {" "}
                                            {value.createdAt
                                                ? new Date(value.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        {/* PRODUCT IMAGE AND DETAILS */}
                                        <td>
                                            {value.orderItems?.map((item, index) => {
                                                const product = item.product;

                                                const imageSrc = product?.images
                                                    ? `${product.images}`
                                                    : homeperfume3;
                                                return (
                                                    <div
                                                        className="imageorder"
                                                        key={item._id || index}
                                                    >
                                                        <div className="order-product-image">
                                                            <img
                                                                src={imageSrc}
                                                                alt={product?.name || "Product"}
                                                                onError={(e) => {
                                                                    console.log("Failed image:", imageSrc);
                                                                    e.currentTarget.onerror = null;
                                                                    e.currentTarget.src = homeperfume3;
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="order-product-info">
                                                            <span4>
                                                                {product?.name ||
                                                                    product?.productName ||
                                                                    "Product"}
                                                            </span4>

                                                            <br />

                                                            <span2>
                                                                Qty: {item.quantity}
                                                            </span2>

                                                            <span2>
                                                                {" "} | Price: ₹
                                                                {product?.sale_price ?? 0}
                                                            </span2>

                                                            <h6>
                                                                Total: ₹
                                                                {(product?.sale_price ?? 0) *
                                                                    item.quantity}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <h6 className="order-grand-total">
                                                Grand Total: ₹{value.totalPrice}
                                            </h6>
                                        </td>

                                        {/* ACTION */}
                                        {/* ACTION */}
                                        <td className="order-action-cell">
                                            <button
                                                className="orderbutton1"
                                                onClick={() => {
                                                    setSelectedOrder(value);
                                                    setshowdetails(true);
                                                }}
                                            >
                                                <FiEye /> Show Details
                                            </button>
                                        </td>

                                        {/* DELIVERY STATUS DROPDOWN */}
                                        <td>
                                            <select
                                                className="order-status-select"
                                                value={value.deliveryStatus || "Pending"}
                                                onChange={(e) =>
                                                    handleStatusChange(value._id, e.target.value)
                                                }
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for Delivery">
                                                    Out for Delivery
                                                </option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Returned">Returned</option>
                                                <option value="Failed Delivery">
                                                    Failed Delivery
                                                </option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>


                    </table>
                </div>

            </div>

            {showdeatils && selectedOrder && (
                <div className="showdetails">
                    <span7 onClick={() => setshowdetails(false)}>
                        <FiX />
                    </span7>

                    <h2>
                        <span6><FiFileText /></span6> Order Details
                    </h2>

                    <h5>
                        #{selectedOrder._id.slice(-8).toUpperCase()}
                        <FiCopy
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={() =>
                                navigator.clipboard.writeText(selectedOrder._id)
                            }
                        />
                    </h5>

                    <div className="insideorderdetails">
                        {/* CUSTOMER DETAILS */}
                        <div className="firstorder">
                            <h3><FiUser /> CUSTOMER DETAILS</h3>

                            <div className="user">
                                <div className="U1">
                                    <span3>
                                        {(selectedOrder.user?.name || "C")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span3>
                                </div>

                                <div className="U1deatils">
                                    <p>{selectedOrder.user?.name || "N/A"}</p>
                                    <p>
                                        User ID: #
                                        {selectedOrder.user?._id
                                            ?.slice(-8)
                                            .toUpperCase() || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <br />

                            <p>
                                <FiPhone /> {selectedOrder.user?.phone || "N/A"}
                            </p>

                            <br />

                            <p>
                                <FiMail /> {selectedOrder.user?.email || "N/A"}
                            </p>
                        </div>

                        {/* SHIPPING ADDRESS */}
                        <div className="addressdetailss">
                            <h3><FiMapPin /> SHIPPING ADDRESS</h3>

                            <p>{selectedOrder.shippingAddress?.fullName || "N/A"}</p>
                            <p>{selectedOrder.shippingAddress?.street || "N/A"}</p>

                            {selectedOrder.shippingAddress?.landmark && (
                                <p>{selectedOrder.shippingAddress.landmark}</p>
                            )}

                            <p>
                                {[
                                    selectedOrder.shippingAddress?.city,
                                    selectedOrder.shippingAddress?.state
                                ].filter(Boolean).join(", ") || "N/A"}
                            </p>

                            <p>
                                {[
                                    selectedOrder.shippingAddress?.country,
                                    selectedOrder.shippingAddress?.zip
                                ].filter(Boolean).join(" - ") || "N/A"}
                            </p>

                            <br />

                            <p>
                                <FiPhone /> Address contact:{" "}
                                {selectedOrder.shippingAddress?.phone || "N/A"}
                            </p>
                        </div>

                        {/* ORDER AND PAYMENT */}
                        <div className="orderpayment">
                            <h3><FiCalendar /> ORDER & PAYMENT</h3>

                            <h6>
                                Order Date:{" "}
                                <span>
                                    {selectedOrder.createdAt
                                        ? new Date(selectedOrder.createdAt)
                                            .toLocaleString()
                                        : "N/A"}
                                </span>
                            </h6>

                            <br />

                            <h6>
                                Payment Status:{" "}
                                <span>{selectedOrder.paymentStatus || "Pending"}</span>
                            </h6>

                            <br />

                            <h6>
                                Payment Method:{" "}
                                <span>
                                    <FiCreditCard />{" "}
                                    {(selectedOrder.paymentMethod || "N/A").toUpperCase()}
                                </span>
                            </h6>

                            <br />

                            <h6>
                                Delivery Status:{" "}
                                <span>{selectedOrder.deliveryStatus || "Pending"}</span>
                            </h6>
                        </div>
                    </div>

                    <br />

                    <h3>ITEMS ORDERED</h3>

                    <br />

                    {selectedOrder.orderItems?.map((item, index) => {
                        const product = item.product;

                        const imageSrc = product?.images
                            ? `${product.images}`
                            : homeperfume3;

                        const price = Number(product?.sale_price || 0);
                        const quantity = Number(item.quantity || 0);

                        return (
                            <div
                                className="itemordered"
                                key={item._id || index}
                            >
                                <div className="itemimage">
                                    <img
                                        src={imageSrc}
                                        alt={product?.name || "Product"}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = homeperfume3;
                                        }}
                                    />
                                </div>

                                <div className="itemdetals">
                                    <h5>{product?.name || "Product unavailable"}</h5>

                                    <h6>
                                        Quantity: <span>{quantity}</span>
                                    </h6>

                                    <h6>
                                        Unit Price: <span>₹{price.toFixed(2)}</span>
                                    </h6>
                                </div>

                                <div className="itemprice">
                                    <h6>Total Price</h6>
                                    <br />
                                    <h6>
                                        <RiMoneyRupeeCircleLine />
                                        <span3>
                                            {(price * quantity).toFixed(2)}
                                        </span3>
                                    </h6>
                                </div>
                            </div>
                        );
                    })}

                    <br />

                    <div className="orderfooter">
                        <div className="paid">
                            <h1>ORDER TOTAL</h1>
                            <h2>
                                <RiMoneyRupeeCircleLine />
                                {Number(selectedOrder.totalPrice || 0).toFixed(2)}
                            </h2>
                        </div>

                        <div className="staus">
                            <h5>
                                Status:{" "}
                                <span>{selectedOrder.deliveryStatus || "Pending"}</span>
                            </h5>
                        </div>

                        <div className="closedetails">
                            <button onClick={() => setshowdetails(false)}>
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <br />
            <br />

        </div>
    )
}