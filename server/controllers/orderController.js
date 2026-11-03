

const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Order } = require("../models/Order");
const { Address } = require("../models/Address");
const { Product } = require("../models/Product");

const razorpay = require("../utils/razorpay");

const getAuthenticatedUserId = (req) =>
  req.userId ||
  req.user?.id ||
  req.user?._id ||
  req.user?.userId;

// Restore stock for items that were successfully deducted.
const restoreStock = async (items) => {
  for (const item of items) {
    await Product.updateOne(
      { _id: item.productId },
      { $inc: { stock: item.quantity } }
    );
  }
};

// Place a new order and deduct stock.
const placeOrder = async (req, res) => {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Please log in first" });
  }

  const deductedItems = [];
  let createdOrderId = null;
  let cartCleared = false;

  try {
    const { paymentMethod , currency="INR" } = req.body;

    if (!["cod", "UPI"].includes(paymentMethod)) {
    return res.status(400).json({
        message: "Invalid payment method"
    });
}

    const user = await User.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const address = await Address.findOne({
      user: userId,
      isDefault: true
    });

    if (!address) {
      return res.status(400).json({
        message: "Please select a default shipping address"
      });
    }

    let subtotal = 0;
    const orderItems = [];

    // Validate the cart before changing stock.
    for (const cartItem of user.cart) {
      const product = cartItem.product;
      const quantity = Number(cartItem.quantity);

      if (!product) {
        return res.status(400).json({
          message: "A product in your cart no longer exists"
        });
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for ${product.name}`
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          message: `${product.name} is not available`
        });
      }

      orderItems.push({
        product: product._id,
        quantity
      });

      subtotal += product.sale_price * quantity;
    }

    const deliveryCharge = subtotal >= 999 ? 0 : 50;
    const totalPrice = subtotal + deliveryCharge;

    // Deduct stock only if enough stock is available.
    for (const item of orderItems) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          isActive: true,
          stock: { $gte: item.quantity }
        },
        {
          $inc: { stock: -item.quantity }
        },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error(
          "INSUFFICIENT_STOCK:" + item.product.toString()
        );
      }

      // Record every successful deduction for rollback.
      deductedItems.push({
        productId: item.product,
        quantity: item.quantity
      });
    }

//     const order = new Order({
//       user: userId,
//       orderItems,
//       shippingAddress: address._id,
//       paymentMethod: "cod",
//       totalPrice,
//       balanceTotal: totalPrice,
//       deliveryStatus: "Pending"
//     });

//     await order.save();
//     createdOrderId = order._id;

// let razorpayOrder = null;

//     // Create one Razorpay order if payment is not COD
//     if (paymentMethod !== "COD") {
//       const options = {
//         amount: totalPrice * 100, // in paise
//         currency,
//         receipt: `receipt_${placeOrder._id}`,
//       };


//       razorpayOrder = await razorpay.orders.create(options);


//       if (!razorpayOrder) {
//         return res
//           .status(500)
//           .json({ message: "Razorpay order creation failed" });
//       }

//       // Save razorpay ID to all orders

//     }

const order = new Order({
    user: userId,
    orderItems,
    shippingAddress: address._id,
    paymentMethod: paymentMethod,
    paymentStatus: paymentMethod === "cod" ? "Pending" : "Pending",
    totalPrice,
    balanceTotal: totalPrice,
    deliveryStatus: "Pending"
});

await order.save();
createdOrderId = order._id;

let razorpayOrder = null;

if (paymentMethod === "UPI") {

    const options = {
        amount: Math.round(totalPrice * 100),
        currency: currency,
        receipt: `receipt_${order._id}`
    };

    razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
        throw new Error("Razorpay order creation failed");
    }

    order.razorpay_order_id = razorpayOrder.id;

    await order.save();
}

    // Clear the cart only after the order has been saved.
    user.cart = [];
    user.cart_total = 0;
    await user.save();
    cartCleared = true;

    const populatedOrder = await Order.findById(createdOrderId)
      .populate("orderItems.product")
      .populate("shippingAddress");

    return res.status(201).json({
      success:true,
      message: "Order placed successfully",
      order: populatedOrder,
      razorpayOrder:razorpayOrder || null,
      paymentMethod
    });
  } catch (error) {
    console.error("Place order error:", error);

    // Compensate for a failed order operation.
    try {
      if (createdOrderId) {
        await Order.deleteOne({ _id: createdOrderId });
      }

      if (deductedItems.length > 0) {
        await restoreStock(deductedItems);
      }

      // If cart clearing was attempted, restore the original cart
      // from the saved order if necessary.
      if (cartCleared && createdOrderId) {
        // The order may already have been deleted, so the cart
        // restoration must be handled before deleting it in a
        // production-grade implementation.
      }
    } catch (rollbackError) {
      console.error("Order rollback error:", rollbackError);

      return res.status(500).json({
        message:
          "Order failed and automatic stock rollback was incomplete. Please check stock before retrying."
      });
    }

    if (error.message?.startsWith("INSUFFICIENT_STOCK:")) {
      return res.status(409).json({
        message:
          "Insufficient stock for one or more products. Please refresh your cart."
      });
    }

    return res.status(500).json({
      message: "Unable to place order"
    });
  }
};

// Get orders belonging to the logged-in user.

const getOrders = async (req, res) => {
    try {
        const userId =
            req.userId ||
            req.user?.id ||
            req.user?._id ||
            req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Please log in first"
            });
        }

        const orders = await Order.find({ user: userId })
            .populate("orderItems.product")
            .populate("shippingAddress")
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);

    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            message: "Unable to fetch orders"
        });
    }
};


// Get all orders (admin).
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderItems.product")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({ message: "Unable to fetch orders" });
  }
};

// Update an order status without allowing cancellation through this route.
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Returned",
      "Failed Delivery"
    ];

    if (!allowedStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        message: "Invalid status. Use the cancellation endpoint to cancel."
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.deliveryStatus === "Cancelled") {
      return res.status(400).json({
        message: "A cancelled order cannot be updated"
      });
    }

    if (order.deliveryStatus === "Returned") {
      return res.status(400).json({
        message: "A returned order cannot be updated"
      });
    }

    if (
      order.deliveryStatus === "Delivered" &&
      deliveryStatus !== "Returned"
    ) {
      return res.status(400).json({
        message: "A delivered order can only be marked as returned"
      });
    }

    order.deliveryStatus = deliveryStatus;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      message: "Unable to update order status"
    });
  }
};

// Cancel an order and restore stock once.
const cancelOrder = async (req, res) => {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Please log in first" });
  }

  const { id } = req.params;
  const restoredItems = [];

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // Atomically claim the cancellation so two requests cannot
    // both cancel the same order.
    const order = await Order.findOneAndUpdate(
      {
        _id: id,
        user: userId,
        deliveryStatus: {
          $nin: ["Cancelled", "Returned", "Delivered"]
        }
      },
      {
        $set: { deliveryStatus: "Cancelled" }
      },
      { new: true }
    );

    if (!order) {
      const existingOrder = await Order.findOne({
        _id: id,
        user: userId
      });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(400).json({
        message:
          "This order cannot be cancelled because it is already cancelled, returned, or delivered"
      });
    }

    // Restore each product's stock.
    for (const item of order.orderItems) {
      const result = await Product.updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } }
      );

      if (result.matchedCount !== 1) {
        throw new Error(
          "STOCK_RESTORE_FAILED:" + item.product.toString()
        );
      }

      restoredItems.push({
        productId: item.product,
        quantity: item.quantity
      });
    }

    return res.status(200).json({
      message: "Order cancelled and stock restored successfully",
      order
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    // Compensate if stock restoration only partially succeeded.
    try {
      for (const item of restoredItems) {
        const result = await Product.updateOne(
          {
            _id: item.productId,
            stock: { $gte: item.quantity }
          },
          { $inc: { stock: -item.quantity } }
        );

        if (result.matchedCount !== 1) {
          throw new Error("Stock compensation failed");
        }
      }

      // Revert cancellation so the customer can retry.
      await Order.updateOne(
        {
          _id: id,
          user: userId,
          deliveryStatus: "Cancelled"
        },
        { $set: { deliveryStatus: "Pending" } }
      );
    } catch (rollbackError) {
      console.error("Cancellation rollback error:", rollbackError);

      return res.status(500).json({
        message:
          "Cancellation encountered an error. Stock or order status may need manual verification."
      });
    }

    return res.status(500).json({
      message: "Unable to cancel order and restore stock"
    });
  }
};

// A return request does not automatically restore stock.
// Restock only after the returned product is received and approved.


const returnOrder = async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const { id } = req.params;
    const { returnReason } = req.body;

    const restockReasons = [
        "Wrong Item Received",
        "Item Not as Described",
        "Size/Color Mismatch",
        "Other"
    ];

    const allowedReasons = [
        ...restockReasons,
        "Damaged Product",
        "Defective Product"
    ];

    const restoredItems = [];
    let claimedOrder = false;

    try {
        if (!userId) {
            return res.status(401).json({
                message: "Please log in first"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid order ID"
            });
        }

        if (!allowedReasons.includes(returnReason)) {
            return res.status(400).json({
                message: "Please select a valid return reason"
            });
        }

        // Atomically claim the return so concurrent requests
        // cannot process the same order twice.
        const order = await Order.findOneAndUpdate(
            {
                _id: id,
                user: userId,
                deliveryStatus: "Delivered",
                isReturned: { $ne: true }
            },
            {
                $set: {
                    deliveryStatus: "Returned",
                    isReturned: true,
                    returnReason,
                    returnStatus: "Completed",
                    returnedAt: new Date()
                }
            },
            { new: true }
        );

        if (!order) {
            const existingOrder = await Order.findOne({
                _id: id,
                user: userId
            });

            if (!existingOrder) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            return res.status(400).json({
                message:
                    "This order cannot be returned again. Only delivered orders can be returned."
            });
        }

        claimedOrder = true;

        const shouldRestoreStock = restockReasons.includes(returnReason);

        if (shouldRestoreStock) {
            for (const item of order.orderItems) {
                const result = await Product.updateOne(
                    { _id: item.product },
                    { $inc: { stock: item.quantity } }
                );

                if (result.matchedCount !== 1) {
                    throw new Error(
                        `Could not restore stock for product ${item.product}`
                    );
                }

                restoredItems.push({
                    productId: item.product,
                    quantity: item.quantity
                });
            }
        }

        return res.status(200).json({
            message: shouldRestoreStock
                ? "Return completed successfully. Product stock has been restored."
                : "Return completed successfully. Stock was not restored because the product was damaged or defective.",
            stockRestored: shouldRestoreStock,
            order
        });

    } catch (error) {
        console.error("Return order error:", error);

        // Compensate for stock increments that succeeded before
        // another stock update failed.
        try {
            for (const item of restoredItems) {
                const result = await Product.updateOne(
                    {
                        _id: item.productId,
                        stock: { $gte: item.quantity }
                    },
                    {
                        $inc: { stock: -item.quantity }
                    }
                );

                if (result.matchedCount !== 1) {
                    throw new Error(
                        `Could not reverse stock for ${item.productId}`
                    );
                }
            }

            if (claimedOrder) {
                await Order.updateOne(
                    {
                        _id: id,
                        user: userId,
                        deliveryStatus: "Returned",
                        isReturned: true
                    },
                    {
                        $set: {
                            deliveryStatus: "Delivered",
                            isReturned: false
                        },
                        $unset: {
                            returnReason: 1,
                            returnStatus: 1,
                            returnedAt: 1
                        }
                    }
                );
            }
        } catch (rollbackError) {
            console.error("Return rollback error:", rollbackError);

            return res.status(500).json({
                message:
                    "Return processing failed. Please verify the order status and stock."
            });
        }

        return res.status(500).json({
            message: "Unable to process the return"
        });
    }
};



module.exports = {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  returnOrder
};

