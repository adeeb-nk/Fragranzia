const express= require("express");
const {getcategories , addcategories , onchangeblock , updatecategory} = require("../controllers/categoryController");

const router = express.Router();

router.get("/",getcategories);

router.post("/",addcategories);

router.put("/updatedstatus/:id",onchangeblock);
router.put("/updatedcategory/:id",updatecategory)




module.exports = router;