import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "../api";
import CarCard from "../components/CarCard";
const categories = ["All", "Classic", "Luxury", "Sports", "Convertible", "Vintage"];
export default function Collection() {
  const [cars, setCars] = useState([]), [search, setSearch] = useState(""), [category, setCategory] = useState("All"), [sort, setSort] = useState("featured"), [error, setError] = useState(""), [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      api.get("/cars", { params: { search, category, sort } })
        .then(r => { setCars(r.data.cars); setError(""); })
        .catch(e => setError(e.response?.data?.message || "Unable to load the collection."))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [search, category, sort]);
  return <main className="subpage"><section className="page-banner collection-banner"><div className="container"><span className="eyebrow eyebrow-light">THE AUTOMOTIVE EDIT</span><h1>The <em>collection.</em></h1><p>Distinctive machines. Unmistakable character. Your next story starts here.</p></div></section>
    <section className="section-pad"><div className="container"><div className="collection-toolbar"><div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by make, model or style…"/></div><label className="sort-control"><SlidersHorizontal size={16}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured first</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="year">Newest year</option></select></label></div>
      <div className="category-pills">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div>
      <div className="results-line"><span>{cars.length} automobile{cars.length===1?"":"s"} to discover</span><span>CURATED WITH CARE</span></div>
      {loading ? <div className="empty-state">Finding your next classic…</div> : error ? <div className="empty-state">{error}</div> : cars.length ? <div className="car-grid">{cars.map(car=><CarCard key={car._id} car={car}/>)}</div> : <div className="empty-state">No automobiles match those filters. Try another search.</div>}
    </div></section></main>;
}
