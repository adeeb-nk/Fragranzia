
const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const addtoCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        // Validate product ID
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        // Find product in database
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

        // Check whether product is already in cart
        const existingItem = user.cart.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                product: productId,
                quantity: 1
            });
        }

        // Save cart to MongoDB
        await user.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart
        });

    } catch (error) {
        console.error("Add to cart error:", error);

        return res.status(500).json({
            message: "Failed to add product to cart"
        });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate("cart.product");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            cart: user.cart,
            cart_total: user.cart_total
        });

    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};




const updatequantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const userId = req.userId;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Find product in this user's cart
        const cartItem = user.cart.find(
            item => item.product.toString() === id
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Update quantity
        cartItem.quantity = quantity;

        // Save to MongoDB
        await user.save();

        return res.status(200).json({
            message: "Quantity updated successfully",
            cart: user.cart
        });

    } catch (error) {
        console.error("Update quantity error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


const deletecart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Find the product in the user's cart
        const itemExists = user.cart.some(
            item => item.product.toString() === id
        );

        if (!itemExists) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Remove the product from the cart
        user.cart = user.cart.filter(
            item => item.product.toString() !== id
        );

        // Save changes to MongoDB
        await user.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart: user.cart
        });

    } catch (error) {
        console.error("Delete cart error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



module.exports = { 
    addtoCart ,
    getCart,
    updatequantity,
    deletecart
};
