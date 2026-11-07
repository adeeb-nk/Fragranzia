const { User } = require("../models/User");

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }

        next();

    } catch (error) {
        console.error("Admin verification error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = checkAdmin;