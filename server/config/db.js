// const mongoose = require("mongoose");

// const connectDb=async ()=>{
//     try{
//         const connection = await mongoose.connect(process.env.MONGO_URI);
//         console.log("Database Connected: ");
        
//     }catch(error){
//         console.log(error);
        
//     }
// };

// module.exports = connectDb;
const mongoose = require("mongoose");

const connectDb = async () => {
    // If already connected, do not re-connect (crucial for serverless environments)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        if (!process.env.VERCEL) {
            process.exit(1);
        }
    }
};

module.exports = connectDb;