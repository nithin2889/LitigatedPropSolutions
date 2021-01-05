import asyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js";

// @desc    Create payment
// @route   POST /api/payment/customer/:id
// @access  Private/Admin
const addPayment = asyncHandler(async (req, res) => {
  const { paymentMethod, totalPrice } = req.body;

  if (paymentMethod === "undefined") {
    res.status(400);
    throw new Error("No payment method found. Try again");
  } else {
    const payment = new Payment({
      user: req.user._id,
      paymentMethod,
      totalPrice,
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  }
});

export { addPayment };
