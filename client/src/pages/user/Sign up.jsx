import React,{useState} from "react";
import {Link} from 'react-router-dom'
import {User,Mail,Lock,Eye,EyeOff} from 'lucide-react'
import {FcGoogle} from 'react-icons/fc';
import {FaFacebookF} from 'react-icons/fa';
import './Sign up.css'

export const SignUp= ()=>{

    let [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        agree:false
    })

    let [formErr,setFormErr]=useState({
        name:false,
        email:false,
        password:false,
        confirm_password:false,
        agree:false
    })

    function handleChange(e){

        let {name,value,type,checked}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function onHandleSubmit(e){
        e.preventDefault()

        let next=true

        let err={
            name:false,
            email:false,
            password:false,
            confirm_password:false,
            agree:false
        }

        if(formData.name == ""){
            err.name=true
            next=false
        }
        if(formData.email == ""){
            err.email=true
            next=false
        }
        if(formData.password == ""){
            err.password=true
            next=false
        }
        if(formData.confirm_password == ""){
            err.confirm_password=true
            next=true
        }
        if(formData.password !== formData.confirm_password){
            err.confirm_password=true
            next=false
        }
        if(!formData.agree){
            err.agree=true
            next=false
        }

        setFormErr(err)
    }

    return(
        <>
        <div className="Signup-container" >
            <div className="logo">
                <h1>Let's Get Started!</h1>
                <p>Create your Account and Unlock the <br /> full potential of Fragranzia</p>
            </div>
            <form action="" onSubmit={onHandleSubmit}>
                <div className="top-btn">
                    <button><FcGoogle/>Google</button>
                    <button><FaFacebookF/>Facebook</button>
                </div><br />
                <div className="line">
                    <span></span>
                    <label>Or sign up with email</label>
                    <span></span>
                </div><br />
                <div className="input-box">
                    <User/>
                    <input type="text" name="name" placeholder="Enter your Username" onChange={handleChange}/>
                </div>
                {formErr.name && <span className="signuperr">Enter your name</span>}<br/>
                <div className="input-box">
                    <Mail/>
                    <input type="email" name="email" id="" placeholder="Enter your email" onChange={handleChange}/>
                </div>
                {formErr.email && <span className="signuperr">Enter your email</span>}<br/>
                <div className="input-box">
                    <Lock/>
                    <input type="password" name="password" id="" placeholder="Enter your password" onChange={handleChange}/>
                </div>
                {formErr.password && <span className="signuperr">Enter your password</span>}<br/>
                <div className="input-box">
                    <Lock/>
                    <input type="password" name="confirm_password" id="" placeholder="Confirm your password" onChange={handleChange}/>
                </div>
                {formErr.confirm_password && <span className="signuperr">Enter your password</span>}<br/>
                <div className="input-checkbox">
                    <input type="checkbox" name="agree" id="" onChange={handleChange}/><label htmlFor="">Agree with <Link to="">Terms & Conditions</Link></label>
                </div>
                {formErr.agree && <span className="signuperr">please agree terms and conditions</span>}<br />
                <button id="signup-btn" type="submit">Sign up</button><br /><br />
                <div className="login">
                    <label>Already have an Account? <Link to="">Sign In</Link></label>
                </div>
            </form>
        </div>
        </>
    )
}