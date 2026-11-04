import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/user/Sign up.jsx'
import { Login } from './pages/user/Log in.jsx'
import { Home } from './pages/user/Home.jsx'
import { Product1 } from './pages/user/Product1.jsx'
import { Product2 } from './pages/user/Product2.jsx'
import { Payment } from './pages/user/Payment.jsx'
import { Paymentsuccess } from './pages/user/Paymentsuccess.jsx'
import { Category } from './pages/admin/Category.jsx'
import { Productadmin1 } from './pages/admin/Productadmin1.jsx'
import { Productadd } from './pages/admin/Product add.jsx'
import { About } from './pages/user/About.jsx'
import { Cart } from './pages/user/Cart.jsx'
import { User } from './pages/admin/User.jsx'
import { Wishlist } from './pages/user/Wishlist.jsx'
import { Profile } from './pages/user/Profile.jsx'
import { Order } from './pages/admin/Order.jsx'
import LoginProtectedRoute from './Components/protected-route/UserProtectedRoute.jsx'
import AdminProtectedRoute from './Components/protected-route/AdminProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'
import Dashboard from "./pages/admin/Dashboard";

function App() {

  return (
    <>


      <Routes>
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Login' element={<Login />} />


        <Route path='/' element={<Home />} />
        <Route path='/Product1' element={<Product1 />} />
        <Route path='/Product2/:id' element={<Product2 />} />
        <Route path='/About' element={<About />} />

        <Route element={<LoginProtectedRoute />} >
          <Route path='/Payment' element={<Payment />} />
          <Route path='/Paymentsuccess' element={<Paymentsuccess />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/Profile' element={<Profile />} />
        </Route>



        <Route element={<AdminProtectedRoute />}>
          <Route path='/Category' element={<Category />} />
          <Route path='/Productadmin1' element={<Productadmin1 />} />
          <Route path='/Productadd' element={<Productadd />} />
          <Route path='/User' element={<User />} />
          <Route path='/Order' element={<Order />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        reverseOrder={false}
      />

    </>
  )
}

export default App
