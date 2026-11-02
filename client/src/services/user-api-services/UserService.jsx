import React from 'react'

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserService = () => {

    const axiosPrivate = useAxiosPrivate()

    const getProduct = async () => {
        const response = await axiosPrivate.get("/product");
        return response.data;
    };

    const addCart = async (id) => {
        const response = await axiosPrivate.post("/cart", {
            productId: id
        });
        return response.data;
    }

    const getCarts = async () => {
        const response = await axiosPrivate.get("/cart");
        return response.data;
    }

    const changequantity = async (id, quantity) => {
        const response = await axiosPrivate.put(`/cart/${id}`, { quantity });
        return response.data;
    }

    const deleteCart = async (id) => {
        const response = await axiosPrivate.delete(`/cart/${id}`);
        return response.data;
    }

    const addwhishlist = async (id) => {
        const response = await axiosPrivate.post("/whishlist", {
            productId: id
        });
        return response.data;
    }

    const getWishlist = async () => {
        const response = await axiosPrivate.get("/whishlist");
        return response.data;
    }

    const deletewishlist = async (id) => {
        const response = await axiosPrivate.delete(`/whishlist/${id}`);
        return response.data;
    }


    const getProfile = async () => {
        const response = await axiosPrivate.get("/api/auth/profile");
        return response.data;
    }

    const changeprofile = async (name, email, password,phone) => {
        const response = await axiosPrivate.put("/api/auth/profile", { name, email, password ,phone});
        return response.data;
    }


    const addaddress = async (addressData) => {
        const response = await axiosPrivate.post(
            "/address",
            addressData
        );

        return response.data;
    };

    const getaddress = async()=>{
        const response = await axiosPrivate.get("/address");
        return response.data;
    }

    
const changeaddress = async (id, addressData) => {
    const response = await axiosPrivate.put(
        `/address/${id}`,
        addressData
    );

    return response.data;
};


const setPrimaryAddress = async (addressId) => {
  const response = await axiosPrivate.put(
    `/address/primary/${addressId}`
  );

  return response.data;
};


//write code of paynow
// Place a COD order
    const placeOrder = async (paymentMethod) => {
        const response = await axiosPrivate.post("/order", {
            paymentMethod
        });
        return response.data;
    };

    // Fetch previous orders
    // const getOrders = async () => {
    //     const response = await axiosPrivate.get("/order");
    //     return response.data;
    // };
    
const getOrders = async () => {
    const response = await axiosPrivate.get("/order");
    return response.data;
};


    const cancelOrder = async (orderId) => {
    const response = await axiosPrivate.put(
        `/order/${orderId}/cancel`
    );
    return response.data;
};


const returnOrder = async (orderId, returnReason) => {
    const response = await axiosPrivate.put(
        `/order/${orderId}/return`,
        { returnReason }
    );

    return response.data;
};


    return {
        getProduct,
        addCart,
        getCarts,
        changequantity,
        deleteCart,
        addwhishlist,
        getWishlist,
        deletewishlist,
        getProfile,
        changeprofile,
        addaddress,
        getaddress,
        changeaddress,
        setPrimaryAddress,
        placeOrder,
        getOrders,
        cancelOrder,
        returnOrder
    };
};

export default UserService