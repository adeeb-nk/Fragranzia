const express= require("express");
const {addtowishlist,getwishlist,deletewishlist} = require("../controllers/wishlistController");
const checkAuth = require("../middleware/authMiddleware")

const router = express.Router();


router.post("/",checkAuth,addtowishlist);
router.get("/",checkAuth,getwishlist)
router.delete("/:id",checkAuth,deletewishlist)







module.exports = router;