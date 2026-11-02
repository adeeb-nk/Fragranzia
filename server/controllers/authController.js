const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User }= require("../models/User");
const { Address } = require("../models/Address");

let register = async (req, res) => {
  
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "Registered Successfully" });
}

let login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1y" });

  res.json({ token,role:user.role });
}

let home = (req, res) => {
  
  User.findById(req.userId)
  res.json({ message: "Welcome to Home Page " });
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};


const changeprofile = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Find the currently logged-in user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update name
    if (name !== undefined) {
      user.name = name;
    }

    // Update email and check whether another user uses it
    if (email !== undefined && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "Email is already in use",
        });
      }

      user.email = email;
    }

    user.phone = phone;

    // Update password only if a new password was provided
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone:user.phone,
      },
    });
  } catch (error) {
    console.error("Change profile error:", error);
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};




const addaddress = async (req, res) => {
  try {
    const {
      addressType,
      fullName,
      phone,
      street,
      city,
      state,
      landmark,
      zip,
      alternatePhone,
      country,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zip
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const address = await Address.create({
      user: req.userId,
      addressType: addressType || "Home",
      fullName,
      phone,
      street,
      city,
      state,
      landmark: landmark || "",
      zip,
      alternatePhone: alternatePhone || "",
      country: country || "India",
    });

    return res.status(201).json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    console.error("Add address error:", error);
    return res.status(500).json({
      message: "Failed to save address",
    });
  }
};



  
const getusers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        const formattedUsers = users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone || "Not provided",
            isActive: user.isActive,
            status: user.status ? "Active" : "Blocked",
            role: user.role,
            joinedDate: user.createdAt,
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error("Fetch users error:", error);
        res.status(500).json({
            message: error.message,
        });
    }
};


const changestatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                message: "isActive must be true or false",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isActive },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User status updated successfully",
            isActive: updatedUser.isActive,
        });
    } catch (error) {
        console.error("Status update error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};



module.exports = {
  register,
  login,
  home,
  getProfile,
  changeprofile,
  addaddress,
  getusers,
  changestatus
};
