import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Log in.css'

export const Login = () => {

    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    let [formErr, setFormErr] = useState({
        email: false,
        password: false
    })

    function loginhandleChange(e) {

        let { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // const loginHandleSubmit= async (e)=> {
    //     e.preventDefault()

    //     let next = true

    //     let err = {
    //         email: false,
    //         password: false
    //     }

    //     if (formData.email == "") {
    //         err.email = true
    //         next = false
    //     }
    //     if (formData.password == "") {
    //         err.password = true
    //         next = false
    //     }

    //     setFormErr(err)

    //     if (next == true) {
    //         const res = await axios.post("http://localhost:5000/api/auth/login", formData);
    //         localStorage.setItem("token", res.data.token);
    //         localStorage.setItem("role", res.data.role);
    //         navigate("/");

    //     }
    // }

    const loginHandleSubmit = async (e) => {
    e.preventDefault();

    let next = true;

    let err = {
        email: false,
        password: false
    };

    if (formData.email === "") {
        err.email = true;
        next = false;
    }

    if (formData.password === "") {
        err.password = true;
        next = false;
    }

    setFormErr(err);

    if (next) {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            // Redirect based on role
            if (res.data.role?.toLowerCase() === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
        }
    }
};


    return (
        <div className="login-container">
            <div className="logo-img">
                <h1>Welcome Back</h1>
                <p>Glad to see you again! Access your <br /> account to explore more</p>
            </div>
            <form action="" onSubmit={loginHandleSubmit}>
                <div className="googlefacebook-btn">
                    <button><FcGoogle />Google</button>
                    <button><FaFacebookF />Facebook</button>
                </div><br />
                <div className="cut">
                    <span></span>
                    <label htmlFor="">Or sign in with email</label>
                    <span></span>
                </div><br />
                <div className="input-container">
                    <User />
                    <input type="text" name="email" placeholder="Enter your email" onChange={loginhandleChange} />
                </div>
                {formErr.email && <span className="loginerr">Enter your email</span>}<br />
                <div className="input-container">
                    <Lock />
                    <input type="password" name="password" id="" placeholder="Enter your password" onChange={loginhandleChange} />
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