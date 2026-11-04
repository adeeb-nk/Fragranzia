import React, { useState, useEffect } from "react";
import './Product1.css'
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders, FiHeart, FiShare2 } from 'react-icons/fi'
import heroperfume from "../../assets/heroperfume.png"
import axios from 'axios'
import {toast} from "react-toastify"

const API_URL = "http://localhost:5000/product"

import UserService from "../../services/user-api-services/UserService";

export const Product1 = () => {

    const [products, setProducts] = useState([]);

    const [showSortOptions, setShowSortOptions] = useState(false);
const [sortBy, setSortBy] = useState("relevance");

const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
        case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);

        case "popularity":
            return (b.rating || 0) - (a.rating || 0);

        case "lowToHigh":
            return Number(a.sale_price) - Number(b.sale_price);

        case "highToLow":
            return Number(b.sale_price) - Number(a.sale_price);

        default:
            return 0;
    }
});

    const { getProduct, addCart, addwhishlist} = UserService();

    const fetchproducts = async () => {
        try {
            const res = await getProduct();

            console.log("Active products received:", res);

            setProducts(Array.isArray(res) ? res : []);
        } catch (error) {
            console.error(
                "Failed to fetch products:",
                error.response?.data || error.message
            );

            setProducts([]);
        }
    };

    const addtoCart = async (id) => {
        let response = await addCart(id);
        toast.success('Successfully added to Cart!')
    }

    const addtowhishlist = async (id) => {
        try {
            const response = await addwhishlist(id);

            // alert(response.message || "Product added to wishlist!");
            toast.success(response.message ||'Successfully added to Whishlist!')
            console.log("Wishlist response:", response);
        } catch (error) {
            console.error(
                "Wishlist error:",
                error.response?.data || error.message
            );

            // alert(
            //     error.response?.data?.message ||
            //     "Failed to add product to wishlist. Please log in."
            // );
            toast.error(error.response?.data?.message ||
                "Failed to add product to wishlist. Please log in.")

        }
    };

    useEffect(() => {
        fetchproducts();
    }, [])

    return (
        <div>

            <div className="home-fullnav">
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

            <div className="home-belownav">
                <p>ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !</p>
            </div>

            <br />

            <div className="product1-allproducts">
                <div className="product1-allproducts-heading">
                    <h1>All Products</h1>
                    <div className="product1-allproducts-headinglink">
                        <Link>Home</Link><FiChevronRight /><Link>Product</Link>
                    </div>
                </div>
                <div className="product1-filterblock">

    <div className="product1-sortby">
        <p>Sort by:</p>
    </div>

    {showSortOptions && (
        <div className="product1-filters">

            <button
                className={sortBy === "relevance" ? "active-sort" : ""}
                onClick={() => setSortBy("relevance")}
            >
                Relevance
            </button>

            <button
                className={sortBy === "newest" ? "active-sort" : ""}
                onClick={() => setSortBy("newest")}
            >
                Newest First
            </button>

            <button
                className={sortBy === "popularity" ? "active-sort" : ""}
                onClick={() => setSortBy("popularity")}
            >
                Popularity
            </button>

            <button
                className={sortBy === "lowToHigh" ? "active-sort" : ""}
                onClick={() => setSortBy("lowToHigh")}
            >
                Price -- Low to High
            </button>

            <button
                className={sortBy === "highToLow" ? "active-sort" : ""}
                onClick={() => setSortBy("highToLow")}
            >
                Price -- High to Low
            </button>

        </div>
    )}

    <div className="product1-filter-button">
        <button onClick={() => setShowSortOptions(!showSortOptions)}>
            Filter <FiSliders />
        </button>
    </div>

</div>
            </div>

            <br /><br />

            {/* all products images grid */}

            <div className="product1-grid">
                {sortedProducts.map((product) => (
                    


                    <div className="product1-fullcard">
                        <Link to={`/Product2/${product._id}`}>
                            <div className="product1-card">
                                <div className="product1-iconsss">
                                    <button onClick={() => addtowhishlist(product._id)}><FiHeart /></button>
                            </div>
                                <img
                                    src={
                                        product.images?.startsWith("http")
                                            ? product.images
                                            : `http://localhost:5000/uploads/${product.images}`
                                    }
                                    alt={product.name}
                                />
                            </div>
                        </Link>
                        <div className="product1-imagedetails">
                            <p>{product.name}</p>
                            
                            <div className="product1-price">
                                <strong>RS {product.sale_price}</strong>
                                <del>RS {product.product_price}</del>
                            </div>
                            <button onClick={() => { addtoCart(product._id) }}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <br /><br />

            <div className="product1-loadmore">
                <button>Load More</button>
            </div>

            <br /><br /><br />

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