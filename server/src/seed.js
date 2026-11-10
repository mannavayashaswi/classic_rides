import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Car from "./models/Car.js";
dotenv.config();

const cars = [
  { name: "Mercedes-Benz 280 SL", brand: "Mercedes-Benz", year: 1969, category: "Classic", dailyRate: 18500, seats: 2, transmission: "Automatic", fuel: "Petrol", location: "Hyderabad", featured: true, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85", description: "An icon of open-top motoring. The 280 SL pairs timeless proportions with a beautifully composed driving experience.", features: ["Convertible roof", "Leather interior", "Classic instrumentation", "Chauffeur option"] },
  { name: "Jaguar E-Type Roadster", brand: "Jaguar", year: 1967, category: "Sports", dailyRate: 22000, seats: 2, transmission: "Manual", fuel: "Petrol", location: "Hyderabad", featured: true, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85", description: "Sculptural British design and spirited performance make this roadster an unforgettable arrival.", features: ["Inline-six character", "Hand-finished cabin", "Roadster profile", "Premium detailing"] },
  { name: "Porsche 911 Classic", brand: "Porsche", year: 1973, category: "Sports", dailyRate: 26000, seats: 4, transmission: "Manual", fuel: "Petrol", location: "Hyderabad", featured: true, image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=85", description: "A pure, driver-focused classic with unmistakable lines and a legacy that still defines sports cars.", features: ["Iconic silhouette", "Driver-focused cockpit", "Sport suspension", "Collector-grade finish"] },
  { name: "Rolls-Royce Silver Shadow", brand: "Rolls-Royce", year: 1975, category: "Luxury", dailyRate: 32000, seats: 5, transmission: "Automatic", fuel: "Petrol", location: "Hyderabad", featured: true, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85", description: "Quiet, stately and unmistakably grand. Arrive with the presence of a true British luxury saloon.", features: ["Handcrafted cabin", "Rear-seat comfort", "Elegant ride", "Chauffeur option"] },
  { name: "Ford Mustang Fastback", brand: "Ford", year: 1968, category: "Vintage", dailyRate: 19500, seats: 4, transmission: "Automatic", fuel: "Petrol", location: "Hyderabad", featured: false, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85", description: "American muscle with unmistakable presence, a charismatic soundtrack and timeless fastback styling.", features: ["V8-inspired character", "Fastback body", "Classic details", "Weekend favourite"] },
  { name: "Volkswagen Beetle", brand: "Volkswagen", year: 1972, category: "Classic", dailyRate: 9500, seats: 4, transmission: "Manual", fuel: "Petrol", location: "Hyderabad", featured: false, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85", description: "A cheerful design classic with enduring charm, perfect for relaxed city drives and memorable celebrations.", features: ["Iconic rounded design", "Compact classic", "Photogenic finish", "Easygoing character"] }
];

try {
  await connectDB();
  await Car.deleteMany({});
  await Car.insertMany(cars);
  console.log(`Seeded ${cars.length} cars.`);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
