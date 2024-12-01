import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  itemId: string; // Unique identifier for the item
  title: string; // Item name (e.g., course name)
  description: string; // Short description
  price: number; // Item price
  discount: number; // Discount applied
  image: string; // URL for the item's image
  quantity: number; // Number of units
}

export interface ICart extends Document {
  userId: string; // Reference to the user
  items: ICartItem[]; // Array of cart items
  totalPrice: number; // Total price before discounts
  totalDiscount: number; // Total discount applied
  finalPrice: number; // Final price to pay
}

const CartItemSchema: Schema = new Schema({
  itemId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: String },
  quantity: { type: Number, default: 1 },
});

const CartSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
