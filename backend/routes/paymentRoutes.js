import express from "express";
import { addPayment } from "../controllers/paymentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/customer/:id").post(protect, admin, addPayment);

export default router;
