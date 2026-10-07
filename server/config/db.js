const mongoose = require("mongoose");

const connectDb=async ()=>{
    try{
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/fragranzia");
        console.log("Database Connected: ");
        
    }catch(error){
        console.log(error);
        
    }
};

module.exports = connectDb;