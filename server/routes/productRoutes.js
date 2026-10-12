const express= require("express");
const {getproducts,addproducts,onchangeblock,updateproducts,fetchimage} = require("../controllers/productController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/",getproducts);

router.post("/",upload.single("images"),addproducts);

router.put("/updatedstatus/:id",onchangeblock);
// router.put("/:id",updateproducts);
router.put("/:id", upload.single("images"), updateproducts);


router.get("/images/:id",fetchimage)




module.exports = router;
