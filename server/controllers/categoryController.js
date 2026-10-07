const {Category} = require("../models/Category");

//get all categories

const getcategories= async (req,res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

//add categories

const addcategories= async (req,res)=>{
    const {name,description,isActive} = req.body;
    try{
        const newCategory = new Category({name,description,isActive});
        await newCategory.save();
        res.status(201).json(newCategory);
    }catch(error){
        res.status(400).json({message:error.message})
    }
};


//update category

const updatecategory= async(req,res)=>{
    const {id}=req.params;
    try{
        const updatedcategory=await Category.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        );
        res.status(200).json(updatedcategory)
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

//change block ststus

const onchangeblock= async(req,res)=>{
    const {id} = req.params;
    const {isActive}= req.body;
    try{
        const changeblock = await Category.findByIdAndUpdate(
            id,
            {isActive:!isActive},
            {new:true}
        );
        res.status(200).json(changeblock)
    }catch(error){
        res.status(400).json({message:error.message});
    }
}






module.exports = {
    getcategories,
    addcategories,
    onchangeblock,
    updatecategory
}