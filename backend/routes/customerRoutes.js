import express from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";

const router = express.Router();

// @desc    fetch all customers
// @route   GET /api/customers
// @access  Public (no token required)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
  })
);

// @desc    fetch single customer
// @route   GET /api/customers/:id
// @access  Public (no token required)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      res.json(customer);
    } else {
      res.status(404);
      throw new Error("Customer not found");
    }
  })
);

export default router;
