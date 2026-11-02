const express= require("express");
const {addtoCart,getCart,updatequantity,deletecart} = require("../controllers/cartController");
const checkAuth = require("../middleware/authMiddleware")

const router = express.Router();


router.post("/",checkAuth,addtoCart);
router.get("/", checkAuth, getCart);
router.put("/:id",checkAuth,updatequantity);
router.delete("/:id",checkAuth,deletecart)






module.exports = router;