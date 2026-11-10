import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1900, max: 2100 },
  category: { type: String, required: true, enum: ["Classic", "Luxury", "Sports", "Convertible", "Vintage"] },
  dailyRate: { type: Number, required: true, min: 1 },
  seats: { type: Number, default: 4, min: 1 },
  transmission: { type: String, default: "Automatic" },
  fuel: { type: String, default: "Petrol" },
  description: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  features: [{ type: String }],
  location: { type: String, default: "Hyderabad" },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

carSchema.index({ name: "text", brand: "text", category: "text", description: "text" });
export default mongoose.model("Car", carSchema);
