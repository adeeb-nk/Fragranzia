import React, { useState, useEffect } from "react";
import './Product2.css'
import { Link, useParams } from "react-router-dom";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiTruck, FiShield, FiHeadphones, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiStar } from 'react-icons/fi'
import { FaTag } from "react-icons/fa"
import axios from 'axios'
import {toast} from "react-toastify"


import UserService from "../../services/user-api-services/UserService";

export const Product2 = () => {

    const { getProduct, addwhishlist, addCart } = UserService();

    const [allData, setAllData] = useState([])

    const [products, setProducts] = useState(null)
    const { id } = useParams();

    const fechData = async () => {
        let res = await getProduct()
        setAllData(res)
    }


    const addtowhishlist = async (id) => {
        try {
            const response = await addwhishlist(id);

            //alert(response.message || "Product added to wishlist!");
            toast.success(response.message ||'Successfully added to Whishlist!')
            console.log("Wishlist response:", response);
        } catch (error) {
            console.error(
                "Wishlist error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add product to wishlist. Please log in."
            );
        }
    };

    const [productError, setProductError] = useState("");

    const fetchimage = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/product/images/${id}`
            );

            setProducts(res.data);
        } catch (error) {
            setProductError(
                error.response?.data?.message || "Product is unavailable"
            );
        }
    };

    const addtoCart = async (id) => {
        let response = await addCart(id);

    }

    useEffect(() => {
        fetchimage()
        fechData()
    }, [])

    if (productError) {
        return <h2>{productError}</h2>;
    }

    if (!products) {
        return <h2>Loading...</h2>;
    }

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


            {/* link */}

            <div className="product2-links">
                <Link>Home</Link><FiChevronRight /><Link>Products</Link><FiChevronRight /><Link>{products.name}</Link>
            </div>

            <br /><br />

            {/* details */}

            <div className="product2-fulldetails">
                <div className="product2-fullimages">
                    <div className="product2-images">
                        <div className="product2-images3">
                            <img src={products.images} width="100px" height="100px" />
                            <img src={products.images} width="100px" height="100px" />
                            <img src={products.images} width="100px" height="100px" />
                        </div>
                        <div className="product2-imagesicons">
                            <button onClick={() => addtowhishlist(products._id)}><FiHeart /></button>
                            <button><FiShare2 /></button>
                        </div>
                        <img src={products.images}  id="product2-single-img" />
                    </div>
                    <button id="product2-purchasebutton">Purchase Now</button>
                    <button id="product2-addbutton" onClick={() => { addtoCart(products._id) }}>Add to Cart</button>
                </div>
                <div className="product2-details">
                    <h2 id="product2-detailsheading">{products.name}</h2>
                    <p id="product2-detailsautograph">Autograph</p>
                    <div className="product2-detailsrating">
                        <h4>4.5</h4><FiStar />
                        <p>1,000 Ratings</p>
                    </div>
                    <p id="product2-detailshurry">Hurry only few stocks left!</p>
                    <div className="product2-detailsprice">
                        <strong>Rs {products.sale_price}</strong>
                        <del>Rs {products.product_price}</del>
                        <p>61% off</p>
                    </div>
                    {/* <div className="product2-detailsbutton">
                        <button>-</button>
                        <h3>1</h3>
                        <button>+</button>
                    </div> */}
                    <h3 className="product2-details-subheading">Delivery</h3>
                    <p id="product2-detailsparagraph">Delivery by 28 Aug, Wednesday | Free</p>
                    <br />
                    <h3 className="product2-details-subheading">Description</h3>
                    <p id="product2-detailsparagraph">{products.description}</p>
                    <br />
                    <h3 className="product2-details-subheading">Available Offers</h3>
                    <div className="product2-details-offers">
                        <p ><FaTag />  Buy two of the same product and get a third one free.</p>
                        <p ><FaTag />  Enjoy free standard shipping on orders exceeding ₹1,399.</p>
                        <p ><FaTag />  Get 15% off your first order</p>
                        <p ><FaTag />  Receive a free tool case with the purchase of any perfume over ₹2,000</p>
                    </div>
                </div>
            </div>

            <br /><br />

            {/* offerzone */}

            <section className="home-offerzone">
                <div className="home-offerzoneheading">
                    <h1>Suggested for you</h1>
                    <div className="home-offerzonebtn">
                        <button><FiChevronLeft /></button>
                        <button><FiChevronRight /></button>
                    </div>
                </div>
                <div className="home-offerzoneproducts">
                    {allData.map((product) => (
                        <div className="home-offerzonecards" key={product._id}>
                            <div className="home-offerzoneimages">
                                <img src={product.images} />
                            </div>
                            <div className="home-offerzonedetails">
                                <p>{product.name}</p>
                                <div className="home-offerzoneprice">
                                    <strong>RS {product.sale_price}</strong>
                                    <del>RS {product.product_price}</del>
                                </div>
                                <button className="home-offerzonecartbtn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>


            </section>




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