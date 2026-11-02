import React, { useState } from "react";
import { FiShoppingCart, FiBell, FiUser, FiSearch, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiChevronRight, FiSliders } from 'react-icons/fi'
import { Link } from "react-router-dom";
import './About.css'
import axios from 'axios'
import signup from '../../assets/signup.png'
import login from '../../assets/login.png'

export const About = () => {

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

            {/* About */}
            <div className="about-fullcontent">
                <div className="about-content">
                    <h1>About Fragraniza</h1>
                    <div className="about-heading-bottomlinks">
                        <Link>Home</Link><FiChevronRight /><Link>About</Link>
                    </div>
                    <p>At Fragranzia, we believe that a perfume is more than just a scent—it's a story, an art, and a science combined to create memories that linger. Our journey began with a vision to craft exquisite fragrances that capture the essence of individuality and elevate every moment into something timeless.
                        <br /><br /> Guided by passion and precision, we source the finest ingredients from around the world to create perfumes that resonate with authenticity and luxury. Each bottle is a masterpiece, meticulously crafted to deliver an unparalleled sensory experience.
                        <br /><br /> Our commitment goes beyond creating fragrances. We aim to inspire confidence, evoke emotions, and celebrate uniqueness through every drop we produce. Fragranzia isn’t just a brand—it’s a celebration of you, your style, and your moments.
                        <br /><br /> With a legacy built on quality, artistry, and innovation, we invite you to explore our collection and find a scent that speaks your story.</p>
                </div>
                <div className="about-image">
                    <img src={login} alt="" id="about-image2" />
                    <img src={signup} alt="" id="about-image1" />
                </div>
            </div>

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