import express from "express";
import {
  addPayment,
  getPaymentById,
} from "../controllers/paymentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/customer/:id").post(protect, admin, addPayment);
router.route("/:id/customer/:custId").get(protect, admin, getPaymentById);

export default router;
