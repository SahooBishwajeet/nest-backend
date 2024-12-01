import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { itemId, title, description, price, discount, image, quantity } =
      req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0,
        totalDiscount: 0,
        finalPrice: 0,
      });
    }

    const existingItem = cart.items.find((item) => item.itemId === itemId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        itemId,
        title,
        description,
        price,
        discount,
        image,
        quantity,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cart.totalDiscount = cart.items.reduce(
      (sum, item) => sum + (item.discount || 0),
      0
    );
    cart.finalPrice = cart.totalPrice - cart.totalDiscount;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.items = cart.items.filter((item) => item.itemId !== itemId);

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cart.totalDiscount = cart.items.reduce(
      (sum, item) => sum + (item.discount || 0),
      0
    );
    cart.finalPrice = cart.totalPrice - cart.totalDiscount;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
      { new: true }
    );

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
