import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
export default function Footer() {
  return <footer className="footer"><div className="container footer-main">
    <div><Link className="brand footer-brand" to="/"><span className="brand-mark">CR</span><span>CLASSIC<span className="brand-light"> RIDES</span><small>THE ART OF ARRIVAL</small></span></Link><p className="footer-copy">A considered collection of automotive icons, curated for life's most memorable moments.</p></div>
    <div><h4>Explore</h4><Link to="/collection">The collection</Link><Link to="/#story">Our story</Link><Link to="/#benefits">The experience</Link></div>
    <div><h4>Concierge</h4><a href="mailto:hello@classicrides.example">Get in touch <ArrowUpRight size={13}/></a><a href="tel:+910000000000">+91 00000 00000</a><span>Hyderabad, India</span></div>
    <div><h4>Follow the journey</h4><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://facebook.com" aria-label="Facebook"><Facebook/></a></div></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Classic Rides. All rights reserved.</span><span>Driven by distinction.</span></div></footer>;
}
