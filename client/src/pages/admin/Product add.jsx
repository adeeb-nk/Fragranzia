import React, { useState,useEffect } from "react";
import './Product add.css'
import { Link } from "react-router-dom";
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

const API_URL = "http://localhost:5000/product"

import AdminService from "../../services/admin-api-services/AdminService"; 

export const Productadd = () => {

    const [inputdata, setInputdata] = useState({
        name: "",
        product_price: "",
        sale_price: "",
        stock: "",
        category: "",
        description: "",
        images: null,
    })

    const {addToProduct,getCategory} = AdminService();

    //product add
    const addproduct = async (e) => {
    e.preventDefault();

    try {
        const formdata = new FormData();

        formdata.append("name", inputdata.name);
        formdata.append("product_price", inputdata.product_price);
        formdata.append("sale_price", inputdata.sale_price);
        formdata.append("stock", inputdata.stock);
        formdata.append("category", inputdata.category);
        formdata.append("description", inputdata.description);

        if (inputdata.images) {
            formdata.append("images", inputdata.images);
        }

        const response = await addToProduct(formdata);

        alert("Product added successfully!");

        console.log("Saved product:", response);
    } catch (error) {
        console.error(
            "Failed to add product:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Failed to add product"
        );
    }
};

    const [categorydata,setcategorydata]= useState([])
    const handlecategories = async () => {
    try {
        const res = await getCategory();

        setcategorydata(
            res.filter(category => category.isActive === true)
        );
    } catch (error) {
        console.log(
            "Error fetching categories:",
            error.response?.data || error.message
        );
    }
};

useEffect(() => {
    handlecategories();
}, []);

    const handlechange = (e) => {

        let { name, value } = e.target;

        setInputdata({
            ...inputdata,
            [name]: value
        })
    }

    const handlefilechange= (e)=>{

        if(e.target.files && e.target.files[0]){
            setInputdata({...inputdata, images : e.target.files[0]})
        }
    }

    return (
        <div className="productadd-full">
            <div className="category-fullnav">
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
            </div>

            <div className="productadd-fullform">
                <form action="">
                    <h2>Add Product</h2>
                    <p>Add your product and necessary informations here</p>

                    <div className="productadd-name">
                        <div>
                            <label htmlFor="">Product Title/Name</label>
                            <input type="text" name="name" onChange={handlechange} />
                        </div>
                        <div>
                            <label htmlFor="">Product Price</label>
                            <input type="text" name="product_price" onChange={handlechange} />
                        </div>
                    </div>

                    <div className="productadd-price">
                        <div>
                            <label htmlFor="">Sales Price</label>
                            <input type="text" name="sale_price" onChange={handlechange} />
                        </div>
                        <div>
                            <label htmlFor="">Product Quantity</label>
                            <input type="text" name="stock" onChange={handlechange} />
                        </div>
                        <div>
                            <label htmlFor="">Category</label>
                            <select
    name="category"
    value={inputdata.category}
    onChange={handlechange}
>
    <option value="">Select Category</option>

    {categorydata.map(category => (
        <option key={category._id} value={category._id}>
            {category.name}
        </option>
    ))}
</select>
                        </div>
                    </div>

                    <div className="productadd-description">
                        <label htmlFor="">Product Description</label>
                        <textarea name="description" id="" onChange={handlechange}></textarea>
                    </div>
                    {/* <div className="productadd-upload">
                        <label htmlFor="">Product Images</label>
                        <input type="file" name="" id="" />
                    </div> */}
                    <div className="productadd-upload">
                        <label>Product Images</label>

                        <div className="productadd-uploadbox">
                            <input
    type="file"
    id="productImages"
    accept="image/jpeg,image/png,image/webp"
    onChange={handlefilechange}
    name="images"
/>

                            <label htmlFor="productImages" className="productadd-uploadcontent">
                                <span>Click to upload or drag & drop (Max 4 images)</span>
                                <small>JPEG, PNG or WEBP only</small>
                            </label>
                        </div>
                    </div>


                </form>

                <div className="productadd-canceladd-btn">
                    <button id="productadd-cancelbtn">Cancel</button>
                    <Link to="/Productadmin1"><button id="productadd-addbtn" onClick={addproduct}>Add Product</button></Link>
                </div>

            </div>
        </div>
    )
}