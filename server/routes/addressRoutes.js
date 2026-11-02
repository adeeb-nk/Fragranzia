const express = require("express");
const checkAuth = require("../middleware/authMiddleware");
const { addaddress, getaddress, changeaddress, setPrimaryAddress} = require("../controllers/addressController");

const router = express.Router();


router.post("/", checkAuth, addaddress);
router.get("/", checkAuth, getaddress);
router.put("/primary/:id", checkAuth, setPrimaryAddress);
router.put("/:id", checkAuth, changeaddress);


module.exports = router;