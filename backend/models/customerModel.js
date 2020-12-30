import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    description: { type: String },
    propertyValue: { type: Number },
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

const customerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  customerAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  properties: [propertySchema],
  numProperties: {
    type: Number,
    default: 0,
  },
  adhaar: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
