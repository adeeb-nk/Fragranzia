
// import React, { useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import {
//     FiShoppingCart,
//     FiBell,
//     FiUser,
//     FiSearch,
//     FiMenu,
//     FiX
// } from "react-icons/fi";

// import "./UserNavbar.css";

// const UserNavbar = () => {

//     const [menuOpen, setMenuOpen] = useState(false);

//     const closeMenu = () => {
//         setMenuOpen(false);
//     };

//     return (
//         <header className="user-fullnav">

//             {/* Logo and Hamburger */}
//             <div className="user-navtop">

//                 <Link to="/" className="user-logo" onClick={closeMenu}>
//                     Fragranzia
//                 </Link>

//                 <button
//                     className="user-mobile-menu-toggle"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     aria-label="Toggle navigation menu"
//                 >
//                     {menuOpen ? <FiX /> : <FiMenu />}
//                 </button>

//             </div>

//             {/* Navbar contents */}
//             <div className={`user-fullnav-content ${menuOpen ? "show-user-mobile-menu" : ""}`}>

//                 {/* Navigation links */}
//                 <nav className="user-navigation">

//                     <ul>

//                         <li>
//                             <NavLink to="/" end onClick={closeMenu}>
//                                 Home
//                             </NavLink>
//                         </li>

//                         <li>
//                             <NavLink to="/Product1" onClick={closeMenu}>
//                                 Products
//                             </NavLink>
//                         </li>

//                         <li>
//                             <NavLink to="/Wishlist" onClick={closeMenu}>
//                                 Wishlist
//                             </NavLink>
//                         </li>

//                         <li>
//                             <NavLink to="/About" onClick={closeMenu}>
//                                 About
//                             </NavLink>
//                         </li>

//                     </ul>

//                 </nav>

//                 {/* Search */}
//                 <div className="user-nav-search">
//                     <FiSearch />

//                     <input
//                         type="text"
//                         placeholder="Search Here"
//                     />
//                 </div>

//                 {/* Right side icons */}
//                 <div className="user-nav-icons">

//                     <Link to="/Cart" onClick={closeMenu} aria-label="Cart">
//                         <FiShoppingCart />
//                     </Link>

//                     <button
//                         type="button"
//                         aria-label="Notifications"
//                     >
//                         <FiBell />
//                     </button>

//                     <Link to="/Profile" onClick={closeMenu} aria-label="Profile">
//                         <FiUser />
//                     </Link>

//                 </div>

//             </div>

//         </header>
//     );
// };

// export default UserNavbar;


import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import {
    FiShoppingCart,
    FiBell,
    FiUser,
    FiSearch,
    FiMenu,
    FiX
} from "react-icons/fi";

import UserService from "../../services/user-api-services/UserService";
import "./UserNavbar.css";

const UserNavbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    // Search states
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();

    const { getProduct } = UserService();

    // Fetch products for autocomplete
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await getProduct();

                setProducts(Array.isArray(res) ? res : []);

            } catch (error) {
                console.error("Failed to fetch search products:", error);
                setProducts([]);
            }
        };

        fetchProducts();

    }, []);

    // Filter products while typing
    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    // Search submit
    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        setShowResults(false);
        setMenuOpen(false);

        navigate(`/Product1?search=${encodeURIComponent(searchTerm.trim())}`);
    };

    // Open selected product
    const handleProductClick = (id) => {

        setShowResults(false);
        setSearchTerm("");
        setMenuOpen(false);

        navigate(`/Product2/${id}`);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setShowResults(false);
    };

    return (

        <header className="user-fullnav">

            {/* Logo and Hamburger */}

            <div className="user-navtop">

                <Link to="/" className="user-logo" onClick={closeMenu}>
                    Fragranzia
                </Link>

                <button
                    className="user-mobile-menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

            </div>


            {/* Navbar contents */}

            <div className={`user-fullnav-content ${menuOpen ? "show-user-mobile-menu" : ""}`}>

                {/* Navigation links */}

                <nav className="user-navigation">

                    <ul>

                        <li>
                            <NavLink to="/" end onClick={closeMenu}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/Product1" onClick={closeMenu}>
                                Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/Wishlist" onClick={closeMenu}>
                                Wishlist
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/About" onClick={closeMenu}>
                                About
                            </NavLink>
                        </li>

                    </ul>

                </nav>


                {/* Search box */}

                <div className="user-search-wrapper">

                    <form
                        className="user-nav-search"
                        onSubmit={handleSearch}
                    >

                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search Here"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowResults(e.target.value.trim().length > 0);
                            }}
                            onFocus={() => {
                                if (searchTerm.trim()) {
                                    setShowResults(true);
                                }
                            }}
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                className="user-search-clear"
                                onClick={() => {
                                    setSearchTerm("");
                                    setShowResults(false);
                                }}
                            >
                                ×
                            </button>
                        )}

                    </form>


                    {/* Autocomplete dropdown */}

                    {showResults && searchTerm.trim() && (

                        <div className="user-search-results">

                            {filteredProducts.length > 0 ? (

                                <>

                                    {filteredProducts.slice(0, 5).map((product) => (

                                        <div
                                            className="user-search-product"
                                            key={product._id}
                                            onClick={() => handleProductClick(product._id)}
                                        >

                                            <img
                                                src={
                                                    product.images?.startsWith("http")
                                                        ? product.images
                                                        : `http://localhost:5000/uploads/${product.images}`
                                                }
                                                alt={product.name}
                                            />

                                            <div className="user-search-product-details">

                                                <h4>{product.name}</h4>

                                                <p>
                                                    ₹ {product.sale_price}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                    <button
                                        className="user-search-viewall"
                                        onClick={handleSearch}
                                    >
                                        View All Results
                                    </button>

                                </>

                            ) : (

                                <p className="user-search-noresult">
                                    No products found!
                                </p>

                            )}

                        </div>

                    )}

                </div>


                {/* Right side icons */}

                <div className="user-nav-icons">

                    <Link to="/Cart" onClick={closeMenu} aria-label="Cart">
                        <FiShoppingCart />
                    </Link>

                    <button
                        type="button"
                        aria-label="Notifications"
                    >
                        <FiBell />
                    </button>

                    <Link to="/Profile" onClick={closeMenu} aria-label="Profile">
                        <FiUser />
                    </Link>

                </div>

            </div>

        </header>

    );
};

export default UserNavbar;

