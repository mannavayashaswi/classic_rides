import { Router } from "express";
import { randomBytes } from "crypto";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);

router.post("/", async (req, res, next) => {
  try {
    const { carId, startDate, endDate, pickupLocation, notes = "" } = req.body;
    if (!carId || !startDate || !endDate || typeof pickupLocation !== "string" || !pickupLocation.trim()) {
      return res.status(400).json({ message: "Car, dates and pickup location are required." });
    }
    if (typeof notes !== "string" || notes.length > 1000) {
      return res.status(400).json({ message: "Notes must be 1,000 characters or fewer." });
    }
    const start = new Date(startDate), end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start < new Date(new Date().setHours(0,0,0,0)) || end <= start) {
      return res.status(400).json({ message: "Choose a valid future pickup date and a return date after pickup." });
    }
    const car = await Car.findOne({ _id: carId, available: true });
    if (!car) return res.status(404).json({ message: "This car is not currently available." });
    const conflictingBooking = await Booking.exists({
      car: car._id,
      status: { $in: ["Pending", "Confirmed"] },
      startDate: { $lt: end },
      endDate: { $gt: start }
    });
    if (conflictingBooking) {
      return res.status(409).json({ message: "This automobile already has a reservation request for part of those dates." });
    }
    const totalDays = Math.ceil((end - start) / 86400000);
    const booking = await Booking.create({
      user: req.user._id, car: car._id, startDate: start, endDate: end, totalDays,
      totalPrice: totalDays * car.dailyRate, pickupLocation, notes,
      reference: `CR-${randomBytes(3).toString("hex").toUpperCase()}`
    });
    const populated = await booking.populate("car");
    res.status(201).json({ booking: populated });
  } catch (err) { next(err); }
});

router.get("/mine", async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car").sort({ createdAt: -1 });
    res.json({ count: bookings.length, bookings });
  } catch (err) { next(err); }
});

router.patch("/:id/cancel", async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    if (booking.status !== "Pending" && booking.status !== "Confirmed") return res.status(400).json({ message: "This booking can no longer be cancelled." });
    booking.status = "Cancelled";
    await booking.save();
    res.json({ booking });
  } catch (err) { next(err); }
});

export default router;
