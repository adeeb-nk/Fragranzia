const mongoose = require("mongoose");
// import { VariantModel } from "./VariantModel.js";

// Used for variant attributes inside options (e.g., size: L)
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        product_price: { type: Number, required: true },
        sale_price: { type: Number, required: true },
        offer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "offer"
        },

        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        // category: { type: String, required: true },

        isActive: { type: Boolean, default: true },
        stock: { type: Number, required: true, default: 0 },
        images: { type: String }, 
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports ={
    Product : mongoose.model("Product", productSchema),
};