import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const [form,setForm]=useState({name:"",email:"",password:"",phone:""});
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  const { authenticate }=useAuth(); const navigate=useNavigate(); const location=useLocation();
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{const {data}=await api.post(`/auth/${isRegister?"register":"login"}`,form);authenticate(data);navigate(location.state?.from||"/my-bookings",{replace:true});}catch(err){setError(err.response?.data?.message||"Something went wrong. Please try again.");}finally{setBusy(false);}};
  return <main className="auth-page"><div className="auth-visual"><div className="auth-visual-shade"></div><div className="auth-visual-copy"><span className="eyebrow eyebrow-light">THE ART OF ARRIVAL</span><h2>Make room for<br/><em>remarkable.</em></h2><p>Exceptional journeys begin with an exceptional point of view.</p></div></div><div className="auth-panel"><div className="auth-form-wrap"><span className="eyebrow">{isRegister?"BECOME A MEMBER":"WELCOME BACK"}</span><h1>{isRegister?"Join the club.":"Your journey\ncontinues."}</h1><p>{isRegister?"Create an account to enquire, reserve and manage your journeys.":"Sign in to view your reservations and discover what's next."}</p>
    <form onSubmit={submit} className="form-stack">{isRegister&&<label>Full name<input name="name" value={form.name} onChange={change} required minLength="2" placeholder="Your name"/></label>}
      <label>Email address<input type="email" name="email" value={form.email} onChange={change} required placeholder="you@example.com"/></label>
      {isRegister&&<label>Phone number <span className="optional">(optional)</span><input name="phone" value={form.phone} onChange={change} placeholder="+91"/></label>}
      <label>Password<input type="password" name="password" value={form.password} onChange={change} required minLength="8" placeholder={isRegister?"At least 8 characters":"Your password"}/></label>
      {error&&<div className="form-error">{error}</div>}<button className="button button-dark form-submit" disabled={busy}>{busy?"Please wait…":isRegister?"Create account":"Sign in"} <ArrowUpRight size={16}/></button>
    </form><div className="auth-switch">{isRegister?"Already a member?":"New to Classic Rides?"} <Link to={isRegister?"/login":"/register"}>{isRegister?"Sign in":"Create an account"}</Link></div>
    <small className="auth-legal">By continuing, you agree to our terms of service and privacy policy.</small></div></div></main>;
}
