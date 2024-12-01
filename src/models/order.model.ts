import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  itemId: string; // Reference to the purchased item (e.g., course ID)
  title: string; // Name of the purchased item
  price: number; // Price per item
  quantity: number; // Quantity of the item purchased
}

export interface IOrder extends Document {
  orderId: string; // Unique order identifier
  userId: string; // Reference to the user
  items: IOrderItem[]; // Array of purchased items
  totalPrice: number; // Total price before discounts
  totalDiscount: number; // Total discount applied
  finalPrice: number; // Final payable amount
  paymentStatus: string; // e.g., "Pending", "Completed"
  paymentMethod: string; // e.g., "Credit Card", "UPI"
  timestamp: Date; // Order date and time
}

const OrderItemSchema: Schema = new Schema({
  itemId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
    paymentMethod: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
