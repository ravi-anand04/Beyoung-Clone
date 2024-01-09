import React from "react";
import Hero from "../components/Hero";
import Offers from "../components/Offers";
import HomeProducts from "../components/HomeProducts/HomeProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <Offers />
      <HomeProducts />
    </div>
  );
};

export default Home;
