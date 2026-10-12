import React from 'react'

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminService = () => {

    const axiosPrivate = useAxiosPrivate()

    const addToProduct = async (data) => {

        const response = await axiosPrivate.post("/product", data);
        return response.data;
    };

    const AddCategory = async (data) => {

        const response = await axiosPrivate.post("/category", data);
        return response.data;
    };

    const EditCategory = async (categoryId, data) => {

        const response = await axiosPrivate.put(`/category/updatedcategory/${categoryId}`, data)
        return response?.data
    };

    const statusCategory = async (categoryId, data)=>{
        const response = await axiosPrivate.put(`/category/updatedstatus/${categoryId}`, data)
        return response.data
    }

    const EditProduct = async (editProductId, data) => {

        const response = await axiosPrivate.put(`product/${editProductId}`, data)
        return response?.data
    };


    const getCategory = async () => {
        const response = await axiosPrivate.get("/category");
        return response.data;
    };

    const getProduct = async () => {
        const response = await axiosPrivate.get("/product");
        return response.data;
    };

    const statusProduct = async (productId, data)=>{
        const response = await axiosPrivate.put(`/product/updatedstatus/${productId}`, data)
        return response.data
    }

    return {
        // getHomePageData,
        // postRegister,
        addToProduct,
        AddCategory,
        EditCategory,
        EditProduct,
        getCategory,
        statusCategory,
        getProduct,
        statusProduct
        // handleToggleProduct,
        // handleToggleCategory,
        // handleToggleUser,
        // getUserData,
        // getCategoryeData,
        // getProductData,
        // AddOffer,
        // getOffer,
        // getOrder,
        // updateStatus,
        // handleToggleOffer,
        // getWeeklyOrder,
        // getsalesByCategory,
        // returnProcess
    };
};

export default AdminService