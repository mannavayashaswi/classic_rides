import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 },
  pickupLocation: { type: String, required: true, trim: true },
  notes: { type: String, trim: true, maxlength: 1000, default: "" },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Pending" },
  reference: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
