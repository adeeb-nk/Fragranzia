
const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const addtowishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        // Check product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        // Check whether product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find logged-in user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prevent duplicate wishlist entries
        const alreadyExists = user.wishlist.some(
            item => item.toString() === productId
        );

        if (alreadyExists) {
            return res.status(200).json({
                message: "Product is already in your wishlist"
            });
        }

        // Add product to wishlist
        user.wishlist.push(productId);
        await user.save();

        return res.status(201).json({
            message: "Product added to wishlist successfully",
            wishlist: user.wishlist
        });

    } catch (error) {
        console.error("Add wishlist error:", error);

        return res.status(500).json({
            message: "Failed to add product to wishlist",
            error: error.message
        });
    }
};




const getwishlist = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .populate("wishlist");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Wishlist fetched successfully",
            wishlist: user.wishlist
        });
    } catch (error) {
        console.error("Get wishlist error:", error);
        return res.status(500).json({
            message: "Failed to fetch wishlist",
            error: error.message
        });
    }
};


const deletewishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        // Find logged-in user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check whether product exists in wishlist
        const exists = user.wishlist.some(
            productId => productId.toString() === id
        );

        if (!exists) {
            return res.status(404).json({
                message: "Product not found in wishlist"
            });
        }

        // Remove product from wishlist
        user.wishlist = user.wishlist.filter(
            productId => productId.toString() !== id
        );

        await user.save();

        return res.status(200).json({
            message: "Product removed from wishlist successfully",
            wishlist: user.wishlist
        });

    } catch (error) {
        console.error("Delete wishlist error:", error);

        return res.status(500).json({
            message: "Failed to delete wishlist product",
            error: error.message
        });
    }
};




module.exports = {
    addtowishlist,
    getwishlist,
    deletewishlist
};
