import { Request, Response } from "express";
import Order, { IOrder } from "../models/order.model";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      orderId,
      userId,
      items,
      totalPrice,
      totalDiscount,
      finalPrice,
      paymentMethod,
    } = req.body;

    const newOrder: IOrder = new Order({
      orderId,
      userId,
      items,
      totalPrice,
      totalDiscount,
      finalPrice,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, orderId } = req.params;
    const order = await Order.findOne({ userId, orderId });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
