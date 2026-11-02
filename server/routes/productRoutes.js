// const express= require("express");
// const {getproducts,addproducts,onchangeblock,updateproducts,fetchimage} = require("../controllers/productController");
// const upload = require("../middleware/upload");

// const router = express.Router();

// router.get("/",getproducts);

// router.post("/",upload.single("images"),addproducts);

// router.put("/updatedstatus/:id",onchangeblock);
// // router.put("/:id",updateproducts);
// router.put("/:id", upload.single("images"), updateproducts);


// router.get("/images/:id",fetchimage)




// module.exports = router;
const express = require("express");

const {
    getproducts,
    getAllProducts,
    addproducts,
    onchangeblock,
    updateproducts,
    fetchimage
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const router = express.Router();

// Customer-facing products
router.get("/", getproducts);

// Admin: all products, including blocked products
router.get("/admin", getAllProducts);

router.post("/", upload.single("images"), addproducts);
router.put("/updatedstatus/:id", onchangeblock);
router.put("/:id", upload.single("images"), updateproducts);
router.get("/images/:id", fetchimage);

module.exports = router;
