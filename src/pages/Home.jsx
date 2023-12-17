import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Offers from "../components/Offers";
import SavingZone from "../components/SavingZone";
import HomeProducts from "../components/HomeProducts";
import Loader from "../components/Loader";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      <Navbar />
      <Hero />
      <Featured />
      <Offers />
      <HomeProducts />
    </div>
  );
};

export default Home;
