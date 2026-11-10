import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, KeyRound, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  useEffect(() => {
    api.get("/cars?featured=true")
      .then(r => setCars(r.data.cars.slice(0,3)))
      .catch(() => setError("We couldn't load the collection right now. Please try again shortly."))
      .finally(() => setLoading(false));
  }, []);
  return <>
    <section className="hero"><div className="hero-image"></div><div className="hero-shade"></div><div className="container hero-content">
      <span className="eyebrow eyebrow-light"><i/> A DIFFERENT KIND OF DRIVE</span><h1>Some journeys<br/><em>become stories.</em></h1><p>Discover a rare collection of timeless automobiles, curated for moments worth remembering.</p>
      <div className="hero-actions"><Link className="button button-gold" to="/collection">Explore the collection <ArrowUpRight size={16}/></Link><a className="hero-secondary" href="#story">Our philosophy <ArrowDown size={15}/></a></div>
      <div className="hero-note"><span>01 / 03</span><span className="hero-line"></span><span>TIMELESS BY DESIGN</span></div>
    </div><div className="hero-vertical">CURATED CLASSICS · EST. 2024</div></section>
    <section className="intro section-pad"><div className="container intro-grid"><span className="eyebrow">THE CLASSIC RIDES EDIT</span><div><h2>Not simply a car.<br/><em>A feeling, rediscovered.</em></h2><p>We believe the road should be as remarkable as the destination. Our handpicked collection brings together automotive icons, each with a story, a soul and a presence all its own.</p><Link className="text-link" to="/collection">Meet the collection <ArrowUpRight size={16}/></Link></div></div></section>
    <section className="section-pad collection-preview"><div className="container"><div className="section-heading"><div><span className="eyebrow">A STUDY IN TIMELESSNESS</span><h2>Icons of the <em>open road.</em></h2></div><Link className="text-link" to="/collection">View all automobiles <ArrowUpRight size={16}/></Link></div>
      <div className="car-grid">{loading ? <div className="empty-state">Curating the collection…</div> : error ? <div className="empty-state">{error}</div> : cars.length ? cars.map(car => <CarCard key={car._id} car={car}/>) : <div className="empty-state">Our collection is being prepared. Please run the sample car seed command to add vehicles.</div>}</div>
    </div></section>
    <section className="story section-pad" id="story"><div className="container story-grid"><div className="story-photo"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85" alt="Classic automobile detail"/><span>CRAFTED TO BE REMEMBERED</span></div><div className="story-copy"><span className="eyebrow">OUR POINT OF VIEW</span><h2>For the love of<br/><em>the extraordinary.</em></h2><p>Classic Rides was born from a simple belief: some machines deserve more than a place in a garage. They deserve to be experienced. We bring exceptional vintage and luxury automobiles closer to the people who appreciate them.</p><p>From a quiet weekend escape to an arrival that turns heads, every detail is considered, personal and unmistakably special.</p><Link to="/collection" className="button button-dark">Discover our world <ArrowUpRight size={16}/></Link></div></div></section>
    <section className="benefits section-pad" id="benefits"><div className="container"><div className="center-heading"><span className="eyebrow">THE CLASSIC RIDES PROMISE</span><h2>More than a rental.<br/><em>A considered experience.</em></h2></div><div className="benefit-grid">
      <div><ShieldCheck/><h3>Confidence, always</h3><p>Carefully maintained vehicles and a team that puts your peace of mind first.</p></div><div><Gem/><h3>Rare by nature</h3><p>A thoughtfully selected fleet of distinctive automobiles with character.</p></div><div><KeyRound/><h3>Personal concierge</h3><p>Clear communication and attentive support from enquiry to return.</p></div><div><Sparkles/><h3>Every detail matters</h3><p>A seamless experience designed around the moments you want to make.</p></div>
    </div></div></section>
    <section className="closing-cta"><div className="container"><span className="eyebrow eyebrow-light">YOUR NEXT CHAPTER AWAITS</span><h2>The road is calling.<br/><em>Answer beautifully.</em></h2><Link className="button button-gold" to="/collection">Find your classic <ArrowRight size={16}/></Link></div></section>
  </>;
}
