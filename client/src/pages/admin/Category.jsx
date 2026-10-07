import React, { useEffect, useState } from "react";
import './Category.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import {
    MdDashboard,
    MdInventory2,
    MdCategory,
    MdLocalOffer,
    MdPeople,
    MdShoppingCart,
    MdLogout
} from "react-icons/md";


const API_URL="http://localhost:5000/category"

export const Category = () => {

    const [showAddCategory, setShowAddCategory] = useState(false);

    const [categories,setCategories] = useState([])
    const [name,setName]= useState("")
    const [description,setDescription] = useState("")
    
    const [editId,setEditId] = useState(null)


    const fetchcategories= async()=>{
        let res=await axios.get(API_URL);
        setCategories(res.data)
    }

    const addcategory= async()=>{
        if(editId){
            await axios.put(`${API_URL}/updatedcategory/${editId}`,{name,description});
        }else{
            await axios.post(API_URL, {name,description,isActive:false});
        }
        fetchcategories();
        setName("")
        setDescription("")
        setEditId(null)
        setShowAddCategory(false)
    }

    const onblockchange =async(id,isActive)=>{
        await axios.put(`${API_URL}/updatedstatus/${id}`,{isActive});
        fetchcategories();
    }

    const handleedit= (category)=>{
        setEditId(category._id);
        setName(category.name)
        setDescription(category.description)
        setShowAddCategory(true)
    }

    const valuesdissappear= ()=>{
        setName(""),
        setDescription("")
    }

    useEffect(()=>{
        fetchcategories();
    },[])


    return (

        <div className="category-full">
            <div className="category-fullnav">
                <h2>Dashtar</h2>
                <div className="category-nav">
                    <nav>
                        <ul>
                            <li><MdDashboard /><Link>Dashboard</Link></li>
                            <li><MdInventory2 /><Link to="/Productadmin1">Products</Link></li>
                            <li><MdCategory /><Link to="/Category">Categories</Link></li>
                            <li><MdLocalOffer /><Link>Offers</Link></li>
                            <li><MdPeople /><Link>Customers</Link></li>
                            <li><MdShoppingCart /><Link>Orders</Link></li>
                        </ul>
                    </nav>
                </div>
                <button id="category-logout"><MdLogout />Log Out</button>
            </div>

            <div className="category-details">
                <div className="category-eiabutn">
                    <div className="category-expoimpo">
                        <button>Export</button>
                        <button>Import</button>
                    </div>
                    <button id="categoty-addbtn" onClick={() => setShowAddCategory(true)}>Add Category</button>
                </div>

                <br /><br />

                <div className="category-table-container">
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((Category, index) => (
                                <tr key={index}>
                                    <td>{Category.name}</td>
                                    <td>{Category.description}</td>
                                    <td><button id="categorytable-editbtn" onClick={()=>{handleedit(Category)}}>Edit</button></td>
                                    <td>{Category.isActive ? (<button id="categorytable-unblockbtn" onClick={()=>{onblockchange(Category._id,Category.isActive)}}>Unblock</button>) : (<button id="categorytable-blockbtn" onClick={()=>{onblockchange(Category._id,Category.isActive)}}>Block</button>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <br /><br />

                <div className="category-prevnextbtn">
                    <button>Previous</button>
                    <p>Page 1 of 2</p>
                    <button>Next</button>
                </div>

            </div>



            {/* ========================================== */}
            {showAddCategory && (
                <div className="category-overlay">

                    <div className="category-addpanel">

                        <div className="category-addheader">
                            <h2>Add Category</h2>

                            <button className="category-closebtn" onClick={() => {setShowAddCategory(false); valuesdissappear();}}> × </button>
                        </div>

                        <div className="category-form">

                            <label>Name</label>
                            <input type="text" placeholder="Category title" value={name} onChange={(e)=>{setName(e.target.value)}}/>

                            <label>Description</label>
                            <textarea placeholder="Category Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>

                            <div className="category-form-buttons">

                                <button className="category-cancelbtn" onClick={() => {setShowAddCategory(false); valuesdissappear(); }}>Cancel</button>

                                <button className="category-savebtn" onClick={addcategory}>Add Category</button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* =========================================== */}

        </div>
    )
}