require("dotenv").config();
const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db");
const categoryRoutes= require("./routes/categoryRoutes");
const productRoutes= require("./routes/productRoutes");
const authRoutes= require("./routes/authroutes");

const app=express();
const PORT=process.env.PORT || 5000;

connectDb();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/category",categoryRoutes);
app.use("/product",productRoutes);


app.use("/api/auth", authRoutes);                    //authentication in signup

app.listen(PORT, ()=>{
    console.log(`Backend running on http://localhost:${PORT}`);
    
})