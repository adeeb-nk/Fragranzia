import React, { useState, useEffect } from "react";
import './Productadmin1.css'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import {
    MdDashboard,
    MdInventory2,
    MdCategory,
    MdLocalOffer,
    MdPeople,
    MdShoppingCart,
    MdLogout
} from "react-icons/md";

import AdminService from "../../services/admin-api-services/AdminService";

const API_URL = "http://localhost:5000/product"

export const Productadmin1 = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setshowEditModal] = useState(false);
    const [showDetailsModal, setshowDetailsModal] = useState(false);

    const [products, setProducts] = useState([]);

    const [newImage, setNewImage] = useState(null);


    const { getProduct, statusProduct, EditProduct, getCategory } = AdminService();

    const fetchproducts = async () => {
        let res = await getProduct();
        console.log("products from backend", res.data);

        setProducts(res)
    }


    const onblockchange = async (id) => {
        try {
            const response = await statusProduct(id, {});

            console.log("Updated status:", response.product.isActive);

            await fetchproducts();
        } catch (error) {
            console.error(
                "Block/unblock failed:",
                error.response?.data || error.message
            );
        }
    };


    const [categorydata, setcategorydata] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");
    const handlecategories = async () => {
        let res = await getCategory();
        setcategorydata(res)
        console.log(categorydata);

    }

    const updateproducts = async () => {
        try {
            const formData = new FormData();

            formData.append("name", selectedProduct.name);
            formData.append("description", selectedProduct.description);
            formData.append("product_price", selectedProduct.product_price);
            formData.append("sale_price", selectedProduct.sale_price);
            formData.append("stock", selectedProduct.stock);

            formData.append("category", selectedCategory);

            // Add new image only if user selected one
            if (newImage) {
                formData.append("images", newImage);
            }

            // const res = await axios.put(
            //     `${API_URL}/${selectedProduct._id}`, formData,
            // );

            const res = await EditProduct(selectedProduct._id, formData);

            console.log("Updated product:", res.data);

            await fetchproducts();

            setNewImage(null);
            setshowEditModal(false);

        } catch (error) {
            console.log("Update error:", error);
        }
    };

    const navigate = useNavigate();
        
        const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        
            navigate("/Login");
        };


    useEffect(() => {
        fetchproducts();
        handlecategories();
    }, [])


    const handlechange = (e) => {

        let { name, value } = e.target;

        setSelectedProduct({
            ...selectedProduct,
            [name]: value
        })
    }




    return (
        <div className="productadmin1-full">
            {/* <div className="category-fullnav">
                <h2>Dashtar</h2>
                <div className="category-nav">
                    <nav>
                        <ul>
                            <li><MdDashboard /><Link>Dashboard</Link></li>
                            <li><MdInventory2 /><Link to="/Productadmin1">Products</Link></li>
                            <li><MdCategory /><Link to="/Category">Categories</Link></li>
                            <li><MdLocalOffer /><Link>Offers</Link></li>
                            <li><MdPeople /><Link to="/User">Customers</Link></li>
                            <li><MdShoppingCart /><Link to="/Order">Orders</Link></li>
                        </ul>
                    </nav>
                </div>
                <button id="category-logout"><MdLogout />Log Out</button>
            </div> */}

            <div className="productadmin1-details">
                <div className="productadmin1-eiabutn">
                    
                    <Link to="/Productadd"><button id="productadmin1-addbtn">Add Product</button></Link>
                </div>

                <br /><br />

                <div className="productadmin1-table-container">
                    <table className="productadmin1-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category?.name}</td>
                                    <td>{product.product_price}</td>
                                    <td>{product.sale_price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <div className="productadmin1-showedit-btn">
                                            <button id="productadmin1-showbtn" onClick={() => { setSelectedProduct(product); setshowDetailsModal(true) }}>Show</button>
                                            {/* <button id="productadmin1-editbtn" onClick={() => { setSelectedProduct(product); setshowEditModal(true) }}>Edit</button> */}
                                            <button
                                                id="productadmin1-editbtn"
                                                onClick={() => {
                                                    setSelectedProduct(product);

                                                    setSelectedCategory(
                                                        product.category?._id || product.category || ""
                                                    );

                                                    setshowEditModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>

                                        </div>
                                    </td>

                                    <td>
                                        {product.isActive ? (
                                            <button
                                                id="productadmin1-blockbtn"
                                                onClick={() => onblockchange(product._id)}
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button
                                                id="productadmin1-unblockbtn"
                                                onClick={() => onblockchange(product._id)}
                                            >
                                                Unblock
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>


            {showEditModal && selectedProduct && (
                <div className="productadmin1-editbox">
                    <div className="productadmin1-edit-content">
                        <div className="productadmin1-edit-header">
                            <h2>Update Product</h2>
                            <button onClick={() => setshowEditModal(false)}>X</button>
                        </div>

                        <div className="productadmin1-edit-form">
                            <div className="productadmin1-edit-inputs">
                                <label htmlFor="">Name</label>
                                <input type="text" name="name" value={selectedProduct.name || ""} onChange={handlechange} />
                            </div>
                            <div className="productadmin1-edit-textarea">
                                <label>Description</label>
                                <textarea name="description" id="" value={selectedProduct.description || ""} onChange={handlechange}></textarea>
                            </div>
                            <div className="productadmin1-edit-inputs">
                                <label htmlFor="">Price</label>
                                <input type="number" name="product_price" value={selectedProduct.product_price || ""} onChange={handlechange} />
                            </div>
                            <div className="productadmin1-edit-inputs">
                                <label>Sale Price</label>
                                <input type="number" name="sale_price" id="" value={selectedProduct.sale_price || ""} onChange={handlechange} />
                            </div>
                            <div className="productadmin1-edit-inputs">
                                <label>Stock</label>
                                <input type="number" name="stock" id="" value={selectedProduct.stock || ""} onChange={handlechange} />
                            </div>
                            {/* <div className="productadmin1-edit-options">
                                <label htmlFor="">Category</label>
                                <select name="category" id="" value={selectedProduct.category?.name || ""} onChange={handleeditchange}>
                                    {categorydata.map((category, index) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>

                            </div> */}
                            <div className="productadmin1-edit-options">
                                <label>Category</label>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>

                                    {categorydata.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className="productadmin1-edit-images">
                                <label htmlFor="">Product images</label>
                                <input type="file" name="" id="" multiple accept="image/jpeg,image/png,image/webp" />
                            </div> */}
                            <div className="productadmin1-edit-images">
                                <label>Product Image</label>

                                {selectedProduct.images ? (
                                    <div className="productadmin1-edit-image-preview">
                                        <img
                                            src={selectedProduct.images}
                                            alt={selectedProduct.name}
                                        />
                                    </div>
                                ) : (
                                    <p>No image available</p>
                                )}

                                <input
                                    type="file"
                                    name="images"
                                    id="editProductImage"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => setNewImage(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="productadmin1-edit-footer">
                            <button className="productadmin1-edit-cancelbtn" onClick={() => setshowEditModal(false)}>Cancel</button>
                            <button className="productadmin1-edit-updatebtn" onClick={() => { updateproducts(); }}>Update Product</button>
                        </div>
                    </div>
                </div>
            )}


            {showDetailsModal && selectedProduct && (
                <div className="productadmin1-showbox">
                    <div className="productadmin1-showcontent">
                        <div className="productadmin1-show-header">
                            <h2>Product Details</h2>
                            <button onClick={() => setshowDetailsModal(false)}>X</button>
                        </div><br /><br />

                        <div className="productadmin1-show-fulldetails">
                            <div className="productadmin1-showimage">
                                <label>Product Images</label><br />
                                {selectedProduct.images ? (
                                    <img src={`${selectedProduct.images}`}
                                        alt={selectedProduct.name} />
                                ) : (
                                    <span>No image</span>
                                )}
                            </div>
                            <div className="productadmin1-show-detailss">

                                <div className="productadmin1-show-name">
                                    <label htmlFor="">Product Name</label>
                                    <p>{selectedProduct.name}</p>
                                </div>
                                <div className="productadmin1-show-category">
                                    <label htmlFor="">Category</label>
                                    <p>{selectedProduct.category?.name}</p>
                                </div>
                                <div className="productadmin1-show-price">
                                    <div className="productadmin1-show-regularprice">
                                        <label htmlFor="">Regular price</label>
                                        <del>{selectedProduct.product_price}</del>
                                    </div>
                                    <div className="productadmin1-show-saleprice">
                                        <label htmlFor="">Sales Price</label>
                                        <strong>{selectedProduct.sale_price}</strong>
                                    </div>
                                </div>
                                <div className="productadmin1-show-status">
                                    <div className="productadmin1-show-stockstatus">
                                        <label htmlFor="">Stock Status</label>
                                        <p>{selectedProduct.stock} in stock</p>
                                    </div>
                                    <div className="productadmin1-show-productstatus">
                                        <label htmlFor="">Status</label>
                                        <p>{selectedProduct.isActive ? "Active" : "Blocked"}</p>
                                    </div>
                                </div>

                            </div>
                        </div><br />

                        <div className="productadmin1-show-description">
                            <label htmlFor="">Description</label>
                            <p>{selectedProduct.description}</p>
                        </div>

                        <div className="productadmin1-show-close-editbtn">
                            <button id="productadmin1-show-closebtn" onClick={() => setshowDetailsModal(false)}>Close</button>
                            <button id="productadmin1-show-editproductbtn" onClick={() => {
                                setSelectedCategory(
                                    selectedProduct.category?._id ||
                                    selectedProduct.category ||
                                    ""
                                );

                                setshowEditModal(true);
                                setshowDetailsModal(false);
                            }}>Edit Product</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}