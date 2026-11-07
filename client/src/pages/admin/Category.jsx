import React, { useEffect, useState } from "react";
import './Category.css'
import { Link,useNavigate } from "react-router-dom";
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

import AdminService from "../../services/admin-api-services/AdminService";        //admin service ne ivide import cheythu


const API_URL="http://localhost:5000/category"

export const Category = () => {

    const [showAddCategory, setShowAddCategory] = useState(false);

    const [categories,setCategories] = useState([])
    const [name,setName]= useState("")
    const [description,setDescription] = useState("")
    
    const [editId,setEditId] = useState(null)

    const {AddCategory,getCategory,EditCategory,statusCategory}=AdminService();                 //adminservice nn destructure cheyth edthu


    const fetchcategories= async()=>{
        let res=await getCategory();
        setCategories(res)
    }

    const addcategory= async()=>{
        if(editId){
            //await axios.put(`${API_URL}/updatedcategory/${editId}`,{name,description});
            await EditCategory(editId,{name,description})
        }else{
            // await axios.post(API_URL, {name,description,isActive:false});
            await AddCategory({name,description})                         //ividenn admin service --> then to admin service and then useaxiosprivate(interceptor)
        }
        fetchcategories();
        setName("")
        setDescription("")
        setEditId(null)
        setShowAddCategory(false)
    }

    const onblockchange =async(id,isActive)=>{
        // await axios.put(`${API_URL}/updatedstatus/${id}`,{isActive});
        await statusCategory(id,{isActive});
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

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    
        navigate("/Login");
    };

    useEffect(()=>{
        fetchcategories();
    },[])


    return (

        <div className="category-full">

            {/* <div className="category-fullnav">
                <h2>Dashtar</h2>
                <div className="category-nav">
                    <nav>
                        <ul>
                            <li><MdDashboard /><Link>Dashboard</Link></li>
                            <li><MdInventory2 /><Link to="/Productadmin1">Products</Link></li>
                            <li><MdCategory /><Link to="/Category">Categories</Link></li>
                            <li><MdPeople /><Link to="/User">Customers</Link></li>
                            <li><MdShoppingCart /><Link to="/Order">Orders</Link></li>
                        </ul>
                    </nav>
                </div>
                <button id="category-logout"><MdLogout />Log Out</button>
            </div> */}
            <aside className="category-fullnav">
            
                    <div className="frag-logo">
                      <h2>Dashtar</h2>
                      <span>ADMIN PANEL</span>
                    </div>
            
                    <nav className="frag-navigation">
            
                      <p className="frag-nav-label">MAIN MENU</p>
            
                      <ul>
            
                        <li className="active">
                          <MdDashboard />
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
            
                        <li>
                          <MdInventory2 />
                          <Link to="/Productadmin1">Products</Link>
                        </li>
            
                        <li>
                          <MdCategory />
                          <Link to="/Category">Categories</Link>
                        </li>
            
            
                        <li>
                          <MdPeople />
                          <Link to="/User">Customers</Link>
                        </li>
            
                        <li>
                          <MdShoppingCart />
                          <Link to="/Order">Orders</Link>
                        </li>
            
                      </ul>
            
                    </nav>
            
                    <div className="frag-sidebar-bottom">
            
                      <div className="frag-admin-profile">
                        <div className="frag-admin-avatar">F</div>
                        <div>
                          <h4>Admin</h4>
                          <p>Store Manager</p>
                        </div>
                      </div>
            
                      <button
                          className="frag-logout"
                          onClick={handleLogout}
                      >
                          <MdLogout />
                          Log Out
                      </button>
            
                    </div>
            
                  </aside>

        

            <div className="category-details">
                <div className="category-eiabutn">
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

                {/* <div className="category-prevnextbtn">
                    <button>Previous</button>
                    <p>Page 1 of 2</p>
                    <button>Next</button>
                </div> */}

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