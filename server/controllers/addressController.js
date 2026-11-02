const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { Address } = require("../models/Address");






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


const getaddress = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Addresses fetched successfully",
            addresses,
        });
    } catch (error) {
        console.error("Get addresses error:", error);

        return res.status(500).json({
            message: "Failed to fetch addresses",
        });
    }
};


const changeaddress = async (req, res) => {
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

        const address = await Address.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        if (addressType !== undefined) address.addressType = addressType;
        if (fullName !== undefined) address.fullName = fullName;
        if (phone !== undefined) address.phone = phone;
        if (street !== undefined) address.street = street;
        if (city !== undefined) address.city = city;
        if (state !== undefined) address.state = state;
        if (landmark !== undefined) address.landmark = landmark;
        if (zip !== undefined) address.zip = zip;
        if (alternatePhone !== undefined) {
            address.alternatePhone = alternatePhone;
        }
        if (country !== undefined) address.country = country;

        await address.save();

        return res.status(200).json({
            message: "Address updated successfully",
            address,
        });
    } catch (error) {
        console.error("Update address error:", error);

        return res.status(500).json({
            message: "Failed to update address",
        });
    }
};


const setPrimaryAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.userId;

    // 1. Check whether this address belongs to the logged-in user
    const selectedAddress = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!selectedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // 2. Make all this user's addresses non-primary
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );

    // 3. Make the selected address primary
    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user: userId,
      },
      { $set: { isDefault: true } },
      { new: true }
    );

    return res.status(200).json({
      message: "Primary address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Set primary address error:", error);

    return res.status(500).json({
      message: "Failed to set primary address",
    });
  }
};



module.exports = {
    addaddress,
    getaddress,
    changeaddress,
    setPrimaryAddress
};
