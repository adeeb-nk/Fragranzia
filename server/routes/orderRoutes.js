
const express = require("express");
const checkAuth = require("../middleware/authMiddleware");

const {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,cancelOrder,returnOrder
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", checkAuth, placeOrder);
router.get("/", checkAuth, getOrders);
router.get("/admin", checkAuth, getAllOrders);
router.put("/:id/status", checkAuth, updateOrderStatus);

router.put("/:id/cancel", checkAuth, cancelOrder);
router.put("/:id/return", checkAuth, returnOrder);


module.exports = router;

