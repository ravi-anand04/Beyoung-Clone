import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Offers from "../components/Offers";
import SavingZone from "../components/SavingZone";
import HomeProducts from "../components/HomeProducts/HomeProducts";
import Loader from "../components/Loader";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Featured /> */}
      <Offers />
      <HomeProducts />
    </div>
  );
};

export default Home;
