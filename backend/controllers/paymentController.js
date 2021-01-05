import asyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js";

// @desc    Create payment
// @route   POST /api/payments/customer/:id
// @access  Private/Admin
const addPayment = asyncHandler(async (req, res) => {
  const { paymentMethod, totalPrice } = req.body;

  if (paymentMethod === "undefined") {
    res.status(400);
    throw new Error("No payment method found. Try again");
  } else {
    const payment = new Payment({
      user: req.user._id,
      customer: req.params.id,
      paymentMethod,
      totalPrice,
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  }
});

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private/Admin
const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate("user", "name email")
    .populate(
      "customer",
      "email mobile name isPaid customerAddress properties"
    );

  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

// @desc    Update payment to paid
// @route   PUT /api/payments/:id/pay
// @access  Private/Admin
const updatePaymentToPaid = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    payment.isPaid = true;
    payment.paidAt = Date.now();
    payment.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

export { addPayment, getPaymentById, updatePaymentToPaid };
