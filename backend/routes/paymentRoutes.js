import express from "express";
import {
  addPayment,
  getMyRegistrations,
  getPaymentById,
  updatePaymentToPaid,
} from "../controllers/paymentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/customer/:id").post(protect, admin, addPayment);
router.route("/myregistrations").get(protect, getMyRegistrations);
router.route("/:id/pay").put(protect, admin, updatePaymentToPaid);
router.route("/:id/customer/:custId").get(protect, admin, getPaymentById);

export default router;
