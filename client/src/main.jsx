import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import CarDetails from "./pages/CarDetails";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import "./styles.css";

function App() {
  return <AuthProvider><BrowserRouter><Navbar/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/collection" element={<Collection/>}/>
    <Route path="/cars/:id" element={<CarDetails/>}/>
    <Route path="/login" element={<Auth mode="login"/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route path="/book/:id" element={<ProtectedRoute><Booking/></ProtectedRoute>}/>
    <Route path="/my-bookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>}/>
    <Route path="*" element={<main className="not-found"><h1>404</h1><p>This road doesn't appear on our map.</p><a className="button button-dark" href="/">Return home</a></main>}/>
  </Routes><Footer/></BrowserRouter></AuthProvider>;
}
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
