import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller";

const router = express.Router();

router.get("/:userId", getCart); // Get the user's cart
router.post("/:userId", addToCart); // Add an item to the cart
router.delete("/:userId/:itemId", removeFromCart); // Remove an item from the cart
router.delete("/:userId", clearCart); // Clear the cart

export default router;
