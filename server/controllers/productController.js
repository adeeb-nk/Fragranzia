const {Product} = require("../models/Product");


//get products
const getproducts= async(req,res)=>{
    try{
        const products = await Product.find().populate("category", "name");
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


//add products
const addproducts= async(req,res)=>{
    try{
        console.log("data received:",req.body);
        
        const {name,product_price,sale_price,stock,category,description}=req.body;
        const images = req.file ? req.file.filename : null;
        const newproduct=new Product({name,product_price,sale_price,stock,category,description,images});
        await newproduct.save();
        res.status(201).json(newproduct);
    }catch(error){
        console.log("backend error",error);
        
        res.status(400).json({message:error.message})
    }
}

//change block status
const onchangeblock= async(req,res)=>{
    const {id} = req.params;
    const {isActive} = req.body;
    try{
        const changeblock = await Product.findByIdAndUpdate(
            id,
            {isActive : !isActive},
            {new : true}
        );
        res.status(200).json(changeblock)
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

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
            category:req.body.category
        };

        // If new image was selected
        if (req.file) {
            updateData.images = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Product update failed",
            error: error.message
        });
    }
};




module.exports={
    getproducts,
    addproducts,
    onchangeblock,
    updateproducts
}