import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, UserRound, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const close = () => setOpen(false);
  const signOut = () => { logout(); close(); navigate("/"); };
  return <header className="site-header">
    <div className="nav-wrap container">
      <Link className="brand" to="/" onClick={close}><span className="brand-mark">CR</span><span>CLASSIC<span className="brand-light"> RIDES</span><small>THE ART OF ARRIVAL</small></span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/" onClick={close}>Home</NavLink>
        <NavLink to="/collection" onClick={close}>The Collection</NavLink>
        {user && <NavLink to="/my-bookings" onClick={close}>My Bookings</NavLink>}
        {user ? <><span className="nav-user"><UserRound size={15}/> {user.name.split(" ")[0]}</span><button className="nav-login" onClick={signOut}><LogOut size={15}/> Sign out</button></>
          : <><NavLink to="/login" onClick={close}>Sign in</NavLink><Link className="button button-gold nav-cta" to="/register" onClick={close}>Join the Club</Link></>}
      </nav>
    </div>
  </header>;
}
