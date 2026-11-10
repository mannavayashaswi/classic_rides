import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Gauge, Users, Fuel, MapPin } from "lucide-react";
import api from "../api";
export default function CarDetails() {
  const { id } = useParams(); const [car,setCar]=useState(null); const [error,setError]=useState("");
  useEffect(()=>{api.get(`/cars/${id}`).then(r=>setCar(r.data.car)).catch(e=>setError(e.response?.data?.message||"Unable to load this automobile."));},[id]);
  if(error) return <main className="subpage"><div className="container empty-state">{error}<p><Link to="/collection" className="text-link">Back to collection</Link></p></div></main>;
  if(!car) return <div className="page-loader">Finding your automobile…</div>;
  return <main className="subpage detail-page"><div className="container detail-top"><Link to="/collection" className="back-link"><ArrowLeft size={15}/> Back to collection</Link><span className="eyebrow">{car.brand} · {car.year}</span></div>
    <div className="container detail-layout"><div className="detail-image"><img src={car.image} alt={car.name}/></div><div className="detail-info"><span className="eyebrow">{car.category.toUpperCase()} COLLECTION</span><h1>{car.name}</h1><p className="detail-description">{car.description}</p><div className="detail-price"><strong>₹{car.dailyRate.toLocaleString("en-IN")}</strong><span>per day · taxes may apply</span></div>
      <div className="detail-specs"><span><Gauge/> {car.transmission}</span><span><Users/> {car.seats} seats</span><span><Fuel/> {car.fuel}</span><span><MapPin/> {car.location}</span></div>
      <h3>Considered details</h3><ul className="feature-list">{car.features?.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul>
      <Link className="button button-gold booking-button" to={`/book/${car._id}`}>Enquire & book <ArrowUpRight size={16}/></Link><p className="detail-note">Every booking request is personally reviewed by our team.</p>
    </div></div></main>;
}
