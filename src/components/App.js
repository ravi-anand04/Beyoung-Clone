import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import "../styles/App.css";
import Search from "../pages/Search";
import ProductDetails from "../pages/Product/Product";
import Checkout from "../pages/Checkout";
import Navbar from "./Navbar";
import TrackOrder from "../pages/TrackOrder";
import Wishlist from "../pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <p className="track py-1">
          Free shipping available on all orders. Don't miss out – shop now!
        </p>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id/:quantity/:size" element={<Checkout />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
