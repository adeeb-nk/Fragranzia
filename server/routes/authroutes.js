const express = require("express");
const checkAuth = require("../middleware/authMiddleware");
const { register, home, login ,getProfile,changeprofile,addaddress,getusers,changestatus} = require("../controllers/authController");


const checkAdmin = require("../middleware/checkAdmin");


const router = express.Router();

router.post("/register",register);

router.post("/login", login);

router.get("/home", checkAuth, home);

router.get("/profile", checkAuth, getProfile);
router.put("/profile",checkAuth,changeprofile);
router.post("/address", checkAuth, addaddress);
router.get("/user",checkAuth,getusers);
router.put("/status/:id",checkAuth,changestatus)



// Admin-only routes
router.get("/user", checkAuth, checkAdmin, getusers);
router.put("/status/:id", checkAuth, checkAdmin, changestatus);

module.exports = router;
