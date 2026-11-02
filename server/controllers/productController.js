const {Product} = require("../models/Product");
const { Category } = require("../models/Category");

//get products
// Get active products for users

// Customer: return only active products
// whose categories are also active
const getproducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
            .populate("category", "name isActive");

        console.log("Total products in database:", allProducts.length);

        console.table(
            allProducts.map((p) => ({
                name: p.name,
                productActive: p.isActive,
                categoryName: p.category?.name ?? "No category",
                categoryActive: p.category?.isActive ?? "Missing category"
            }))
        );

        const activeProducts = allProducts.filter(
            (p) =>
                p.isActive === true &&
                p.category &&
                p.category.isActive === true
        );

        console.log("Active products returned:", activeProducts.length);

        return res.status(200).json(activeProducts);
    } catch (error) {
        console.error("Product fetch error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Admin: return all products, including blocked products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name isActive");

        return res.status(200).json(products);
    } catch (error) {
        console.error("Admin product fetch error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


//add products
const addproducts = async (req, res) => {
    try {
        const {
            name,
            product_price,
            sale_price,
            stock,
            category,
            description
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a product image"
            });
        }

        // Check whether the category exists and is active
        const categoryData = await Category.findById(category);

        if (!categoryData) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if (!categoryData.isActive) {
            return res.status(400).json({
                message: "Cannot add a product to a blocked category"
            });
        }

        // Cloudinary URL
        const imageUrl = req.file.path;

        const newproduct = new Product({
            name,
            product_price,
            sale_price,
            stock,
            category,
            description,
            images: imageUrl
        });

        await newproduct.save();

        return res.status(201).json({
            message: "Product added successfully",
            product: newproduct
        });
    } catch (error) {
        console.error("Product upload error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

//change block status


const onchangeblock = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Toggle the actual database status
        product.isActive = !product.isActive;

        await product.save();

        return res.status(200).json({
            message: "Product status updated successfully",
            product
        });

    } catch (error) {
        console.error("Error updating product status:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



//upadte products
const updateproducts = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            product_price: req.body.product_price,
            sale_price: req.body.sale_price,
            stock: req.body.stock,
            category: req.body.category
        };

        // Update the image only if a new one was uploaded
        if (req.file) {
            updateData.images = req.file.path;
        }

        // Validate the category if one was supplied
        if (req.body.category) {
            const categoryData = await Category.findById(
                req.body.category
            );

            if (!categoryData || !categoryData.isActive) {
                return res.status(400).json({
                    message: "Please select an active category"
                });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.error("Product update error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



// const fetchimage=async(req,res)=>{
//     const {id}=req.params

//     try{
//       let data=await Product.findById(id)
//       res.json(data)
//     }
//     catch(error){
//       res.json({message:error.message})
//     }
// }

const fetchimage = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            _id: id,
            isActive: true
        }).populate({
            path: "category",
            match: { isActive: true },
            select: "name isActive"
        });

        if (!product || !product.category) {
            return res.status(404).json({
                message: "Product is unavailable"
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};




// module.exports={
//     getproducts,
//     addproducts,
//     onchangeblock,
//     updateproducts,
//     fetchimage
// }

module.exports = {
    getproducts,
    getAllProducts,
    addproducts,
    onchangeblock,
    updateproducts,
    fetchimage
};
