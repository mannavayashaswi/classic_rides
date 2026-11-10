import { ArrowUpRight, Users, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
export default function CarCard({ car }) {
  return <article className="car-card">
    <Link to={`/cars/${car._id}`} className="car-image-wrap"><img src={car.image} alt={`${car.year} ${car.name}`} loading="lazy"/><span className="car-year">{car.year}</span><span className="image-arrow"><ArrowUpRight size={18}/></span></Link>
    <div className="car-card-body"><div className="car-meta"><span>{car.brand}</span><span>{car.category}</span></div><Link to={`/cars/${car._id}`}><h3>{car.name}</h3></Link>
      <div className="car-specs"><span><Users size={14}/> {car.seats} seats</span><span><CalendarDays size={14}/> {car.transmission}</span></div>
      <div className="car-card-bottom"><p><strong>₹{car.dailyRate.toLocaleString("en-IN")}</strong><small> / day</small></p><Link className="text-link" to={`/cars/${car._id}`}>Discover <ArrowUpRight size={15}/></Link></div>
    </div>
  </article>;
}
