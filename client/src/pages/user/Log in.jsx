import React,{useState} from "react";
import { Link } from "react-router-dom";
import {User,Lock} from 'lucide-react'
import {FcGoogle} from 'react-icons/fc';
import {FaFacebookF} from 'react-icons/fa';
import './Log in.css'

export const Login= ()=>{
    let [formData,setFormData]=useState({
        name:"",
        password:"",
    })

    let [formErr,setFormErr]=useState({
        name:false,
        password:false
    })

    function loginhandleChange(e){

        let {name,value}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }

    function loginHandleSubmit(e){
        e.preventDefault()

        let next=true

        let err={
            name:false,
            password:false
        }

        if(formData.name == ""){
            err.name=true
            next=false
        }
        if(formData.password == ""){
            err.password=true
            next=false
        }

         setFormErr(err)
    }

    return(
        <div className="login-container">
            <div className="logo-img">
                <h1>Welcome Back</h1>
                <p>Glad to see you again! Access your <br /> account to explore more</p>
            </div>
            <form action="" onSubmit={loginHandleSubmit}>
                <div className="googlefacebook-btn">
                    <button><FcGoogle/>Google</button>
                    <button><FaFacebookF/>Facebook</button>
                </div><br />
                <div className="cut">
                    <span></span>
                    <label htmlFor="">Or sign in with email</label>
                    <span></span>
                </div><br />
                <div className="input-container">
                    <User/>
                    <input type="text" name="name" placeholder="Enter your username" onChange={loginhandleChange}/>
                </div>
                {formErr.name && <span className="loginerr">Enter your name</span>}<br/>
                <div className="input-container">
                    <Lock/>
                    <input type="password" name="password" id="" placeholder="Enter your password" onChange={loginhandleChange}/>
                </div>
                {formErr.password && <span className="loginerr">Enter your password</span>} <br />
                <div className="forgot-password">
                    <Link>Forgot Password?</Link>
                </div><br /><br />
                <button id="login-btn">Log in</button>
                <div className="signup">
                    <p>Don't have an account?<Link>Sign up</Link></p>
                </div>
            </form>
        </div>
    )
}