import React, { useState, useEffect } from "react";
import './Home.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiTruck, FiShield, FiHeadphones, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import heroperfume from "../../assets/heroperfume.png"
import homeperfume1 from "../../assets/homeperfume1.jpg"
import homeperfume2 from "../../assets/homeperfume2.png"
import homeperfume3 from "../../assets/homeperfume3.png"
import homeperfumenth from "../../assets/homeperfumenth.jpg"
import perfumees from "../../assets/perfumees.webp"
import perfumees1 from "../../assets/perfumees1.webp"
import perfumees2 from "../../assets/perfumees2.jpg"
import catetogory1 from "../../assets/catetogory1.jpg"
import { Badge } from "lucide-react";
import {toast} from "react-toastify"
import { FiMenu, FiX } from "react-icons/fi";



const categories = [
    { image: homeperfume3, name: "Eau De Parfum" },
    { image: catetogory1, name: "Concentrated" },
    { image: perfumees, name: "Deodorants" },
    { image: perfumees1, name: "Body Mist" },
    { image: homeperfume2, name: "Combo" },
]

const API_URL = "http://localhost:5000/product"

import UserService from "../../services/user-api-services/UserService";

export const Home = () => {

    const { getProduct, addCart } = UserService();

    const [products, setProducts] = useState([]);

    const [menuOpen, setMenuOpen] = useState(false);

    const fetchproducts = async () => {
        //let res = await axios.get(API_URL);
        let res = await getProduct();
        console.log("products from backend", res.data);

        setProducts(res)
    }

    const addtoCart = async (id) => {
        let response = await addCart(id);
        toast.success('Successfully added to Cart!')
    }

    <div className="home-fullnav">

    {/* Logo and Hamburger */}
    <div className="home-navtop">

        <h2 id="nav-heading">Fragranzia</h2>

        <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
        >
            {menuOpen ? <FiX /> : <FiMenu />}
        </button>

    </div>

    {/* Navbar contents */}
    <div className={`home-fullnav1 ${menuOpen ? "show-mobile-menu" : ""}`}>

        <div className="home-nav">
            <nav>
                <ul>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/Product1" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><Link to="/Wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link></li>
                    <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
                </ul>
            </nav>
        </div>

        <div className="home-navsearch">
            <FiSearch />
            <input type="text" placeholder="Search Here" />
        </div>

        <div className="home-navicons">
            <Link to="/Cart"><FiShoppingCart /></Link>
            <FiBell />
            <Link to="/Profile"><FiUser /></Link>
        </div>

    </div>

</div>

    useEffect(() => {
        fetchproducts();
    }, []);


    return (
        <div>
            <div className="home-fullnav">

    {/* Logo and Hamburger */}
    <div className="home-navtop">

        <h2 id="nav-heading">Fragranzia</h2>

        <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
        >
            {menuOpen ? <FiX /> : <FiMenu />}
        </button>

    </div>

    {/* Navbar contents */}
    <div className={`home-fullnav1 ${menuOpen ? "show-mobile-menu" : ""}`}>

        <div className="home-nav">
            <nav>
                <ul>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/Product1" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><Link to="/Wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link></li>
                    <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
                </ul>
            </nav>
        </div>

        <div className="home-navsearch">
            <FiSearch />
            <input type="text" placeholder="Search Here" />
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

            <div className="home-hero">
                <div className="home-hero1">
                    <h1>Discover perfumes that celebrate individuality</h1>
                    <p>Every moment with an unforgettable essence.</p>
                    <Link to='/Product1'><button>Shop Now</button></Link>
                </div>
                <div className="home-hero2">
                    <img src={heroperfume} id="home-img1" alt="" width="350px" />
                    <img src={heroperfume} id="home-img2" width="300px" />
                </div>
            </div>

            <div className="home-belowhero">
                <div className="home-belowhero1">
                    <div>
                        <h3>Unlock Exclusive Offers</h3>
                        <p>Discover special deals tailored just for you!</p>
                    </div>
                    <img src={homeperfume1} alt="" />
                </div>
                <div className="home-belowhero2">
                    <h3>Gift a Scents to your loved one.</h3>
                    <p>Make your love more beautiful</p>
                    <img src={homeperfume2} alt="" />
                </div>
                <div className="home-belowhero3">
                    <h3>Luxury Scents <br />Starting at ₹4,000</h3>
                    <span>Shop <br />Now</span>
                    <img src={homeperfume3} alt="" />
                </div>
            </div><br /><br /><br />

            <div className="home-characteristics">
                <div className="home-characteristics1">
                    <FiTruck />
                    <div>
                        <h2>Fast & Reliable Delivery</h2>
                        <p>Get your orders delivered on time, every time.</p>
                    </div>
                </div>
                <div className="home-characteristics2">
                    <FiShield />
                    <div>
                        <h2>Secure Payments</h2>
                        <p>Shop with confidence using our encrypted payment gateways.</p>
                    </div>
                </div>
                <div className="home-characteristics3">
                    <FiHeadphones />
                    <div>
                        <h2>24/7 Customer Support</h2>
                        <p>We’re here to assist you anytime, anywhere.</p>
                    </div>
                </div>
            </div><br /><br />


            <section className="home-featuredcollections">
                <div className="home-featuredcollectionsheading">
                    <h1>Featured Collections</h1>
                    <div className="home-featuredcollectionsbtn">
                        <button><FiChevronLeft /></button>
                        <button><FiChevronRight /></button>
                    </div>
                </div>
                <div className="home-featuredcollectionsproducts">
                    {products.map((product) => (
                        <div className="home-featuredcollectionscards">
                            <div className="home-featuredcollectionsimages">
                                <span>New</span>
                                <img src={product.images} alt={product.name} />
                            </div>
                            <div className="home-featuredcollectionsdetails">
                                <p>{product.name}</p>
                                <div className="home-featuredcollectionsprice">
                                    <strong>RS {product.sale_price}</strong>
                                    <del>RS {product.product_price}</del>
                                </div>
                                <button className="home-featuredcollectionscartbtn" onClick={() => { addtoCart(product._id) }}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>


            </section>

            <br /><br />




            <div className="home-quote">
                <p>"It's an art. A craft. A science. At Fragranzia, we're in the business of creating memories that last forever through our fragrances."</p>
            </div>

            <br /><br /><br /><br />

            <div className="home-newarrivals">
                <div className="home-newarrival"><h1>New Arrivals</h1></div>
                <div className="home-limitededition"><h1>Limited Edition</h1></div>
                <div className="home-sellers"><h1>Best Sellers</h1></div>
            </div>

            <br /><br />

            {/* explore categories */}

            <section className="home-categories">
                <div className="home-categoryheading">
                    <h1>Explore Categories</h1>
                    <Link>See all</Link>
                </div>
                <div className="home-category">
                    {categories.map((category) => (
                        <div className="home-categorycards">
                            <div className="home-categoryimages">
                                <img src={category.image} alt="" />
                            </div>
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <br /><br /><br />

            {/* offerzone */}

            <section className="home-offerzone">
                <div className="home-offerzoneheading">
                    <h1>Offers Zone</h1>
                    <div className="home-offerzonebtn">
                        <button><FiChevronLeft /></button>
                        <button><FiChevronRight /></button>
                    </div>
                </div>
                <div className="home-offerzoneproducts">
                    {products.map((product) => (
                        <div className="home-offerzonecards">
                            <div className="home-offerzoneimages">
                                <img src={product.images} alt={product.name} />
                            </div>
                            <div className="home-offerzonedetails">
                                <p>{product.name}</p>
                                <div className="home-offerzoneprice">
                                    <strong>RS {product.sale_price}</strong>
                                    <del>RS {product.product_price}</del>
                                </div>
                                <button className="home-offerzonecartbtn" onClick={() => { addtoCart(product._id) }}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>


            </section>

            <br /><br />

            <div className="home-elegance">
                <div>
                    <h1>Elegance in Every Bottle</h1>
                    <p>Discover timeless fragrances crafted for every moment</p>
                    <Link to='/Product1'><button>Shop Now</button></Link>
                </div>
                <img src={homeperfumenth} alt="" />
            </div>

            <br /><br />

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