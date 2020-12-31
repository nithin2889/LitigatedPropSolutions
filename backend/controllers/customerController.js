import asyncHandler from "express-async-handler";
import Customer from "../models/CustomerModel.js";

// @desc    fetch all customers
// @route   GET /api/customers
// @access  Public (no token required)
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

// @desc    fetch single customer
// @route   GET /api/customers/:id
// @access  Public (no token required)
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer not found!");
  }
});

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    // Trust any admin with all your customers to delete
    await customer.remove();
    res.json({ message: "Customer removed" });
  } else {
    res.status(404);
    throw new Error("Customer not found!");
  }
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private/Admin
const createCustomer = asyncHandler(async (req, res) => {
  // When user clicks on CREATE CUSTOMER, a dummy customer will be created in the DB
  // and the screen will redirect to customer creation screen there by letting us to
  // update the customer details and create them.
  const customer = new Customer({
    user: req.user._id,
    name: "Sample Customer",
    dob: "2020-01-01",
    email: "sample@example.com",
    mobile: "+919999999999",
    customerAddress: {
      address: "Sample Address",
      city: "Sample City",
      state: "Sample State",
      postalCode: "555555",
      country: "India",
    },
    adhaar: "101010101010",
    pan: "BUSQO1725L",
  });
  const createdCustomer = await customer.save();
  res.status(201).json(createdCustomer);
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
const updateCustomer = asyncHandler(async (req, res) => {
  const { name, dob, email, mobile, customerAddress, adhaar, pan } = req.body;
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.name = name;
    customer.dob = dob;
    customer.email = email;
    customer.mobile = mobile;
    customer.customerAddress = customerAddress;
    customer.pan = pan;
    customer.adhaar = adhaar;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

export {
  getCustomers,
  getCustomerById,
  deleteCustomer,
  createCustomer,
  updateCustomer,
};
