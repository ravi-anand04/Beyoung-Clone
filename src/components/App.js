import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import "../styles/App.css";
import Search from "../pages/Search";
import ProductDetails from "../pages/Product/Product";
import Cart from "../pages/Cart";
import Shipping from "../pages/Shipping";
import Payment from "../pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* <p className="track py-1">
          Free shipping available on all orders. Don't miss out – shop now!
        </p> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/checkout/shipping" element={<Shipping />} />
          <Route path="/checkout/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
