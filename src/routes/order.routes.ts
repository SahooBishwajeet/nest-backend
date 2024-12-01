import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/", createOrder); // Place an order
router.get("/:userId", getOrders); // Get all orders for a user
router.get("/:userId/:orderId", getOrderById); // Get a specific order

export default router;
