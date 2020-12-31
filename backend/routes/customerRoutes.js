import express from "express";
import {
  createCustomer,
  createCustomerProperty,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCustomers).post(protect, admin, createCustomer);
router.route("/:id/properties").post(protect, admin, createCustomerProperty);
router
  .route("/:id")
  .get(getCustomerById)
  .delete(protect, admin, deleteCustomer)
  .put(protect, admin, updateCustomer);

export default router;
