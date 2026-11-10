import { Router } from "express";
import Car from "../models/Car.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { search = "", category = "", featured, sort = "featured" } = req.query;
    const filter = { available: true };
    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;
    if (search.trim()) filter.$or = [
      { name: { $regex: search.trim(), $options: "i" } },
      { brand: { $regex: search.trim(), $options: "i" } },
      { category: { $regex: search.trim(), $options: "i" } }
    ];
    const sortMap = { price_asc: { dailyRate: 1 }, price_desc: { dailyRate: -1 }, year: { year: -1 }, featured: { featured: -1, createdAt: -1 } };
    const cars = await Car.find(filter).sort(sortMap[sort] || sortMap.featured);
    res.json({ count: cars.length, cars });
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found." });
    res.json({ car });
  } catch (err) { next(err); }
});

export default router;
