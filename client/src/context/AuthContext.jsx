import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("classic-rides-user")); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("classic-rides-token");
    if (!token) { setLoading(false); return; }
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => {
      localStorage.removeItem("classic-rides-token"); localStorage.removeItem("classic-rides-user"); setUser(null);
    }).finally(() => setLoading(false));
  }, []);
  const authenticate = data => {
    localStorage.setItem("classic-rides-token", data.token);
    localStorage.setItem("classic-rides-user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => { localStorage.removeItem("classic-rides-token"); localStorage.removeItem("classic-rides-user"); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, authenticate, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
