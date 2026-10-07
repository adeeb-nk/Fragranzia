import React, { useState , useEffect } from "react";
import './Product1.css'
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight,FiSliders } from 'react-icons/fi'
import heroperfume from "../../assets/heroperfume.png"
import axios from 'axios'


const API_URL = "http://localhost:5000/product"

export const Product1 = () => {

    const [products,setProducts]=useState([]);

    const fetchproducts = async () => {
        let res = await axios.get(API_URL);
        console.log("products from backend", res.data);

        setProducts(res.data)
    }

    useEffect(()=>{
        fetchproducts();
    },[])

    return (
        <div>

            <div className="home-fullnav">
                <h2 id="nav-heading">Fragranzia</h2>
                <div className="home-fullnav1">
                    <div className="home-nav">
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/Product1">Products</Link></li>
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

            <div className="home-belownav">
                <p>ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !</p>
            </div>

        <br />

            <div className="product1-allproducts">
                <div className="product1-allproducts-heading">
                    <h1>All Products</h1>
                    <div className="product1-allproducts-headinglink">
                        <Link>Home</Link><FiChevronRight/><Link>Product</Link>
                    </div>
                </div>
                <div className="product1-filterblock">
                    <div className="product1-sortby">
                        <p>Sort by:</p>
                    </div>
                    <div className="product1-filters">
                        <button>Relevance</button>
                        <button>Newest First</button>
                        <button>Popularity</button>
                        <button>Price--Low to High</button>
                        <button>Price--High to Low</button>
                    </div>
                    <div className="product1-filter-button">
                        <button>Filter<FiSliders/></button>
                    </div>
                </div>
            </div>

            <br /><br />

            {/* all products images grid */}

            <div className="product1-grid">
                {products.map((product)=>(
                    <div className="product1-fullcard">
                        <div className="product1-card">
                            <img src={`http://localhost:5000/uploads/${product.images}`} alt={product.name} />
                        </div>
                        <div className="product1-imagedetails">
                            <p>{product.name}</p>
                            <div className="product1-price">
                                <strong>RS {product.sale_price}</strong>
                                <del>RS {product.product_price}</del>
                            </div>
                            <button>Add to Cart</button>
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
                        <li><Link to="#">Home</Link></li>
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