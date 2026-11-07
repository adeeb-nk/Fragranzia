// const jwt = require("jsonwebtoken");

// const checkAuth = (req, res, next) => {
//   let token;

//   if (req.headers.authorization ) {
//     token = req.headers.authorization;
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.userId = decoded._id;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not Authorized" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No Token" });
//   }
// };

// module.exports = checkAuth;

const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No Token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user from database
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Check blocked status
        if (user.isActive === false) {
            return res.status(403).json({
                message: "Your account has been blocked. Contact admin."
            });
        }

        req.userId = user._id;
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }
};

// Admin authorization
const checkAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only"
        });
    }

    next();
};

module.exports = checkAuth;
module.exports.checkAdmin = checkAdmin;