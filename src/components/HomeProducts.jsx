import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { FILTERED_PRODUCTS } from "../constants";
import Button from "./Button";
import "../styles/App.css";

const HomeProducts = () => {
  const [shirt, setShirt] = useState([]);
  const [tshirt, setTshirt] = useState([]);
  const [trouser, setTrouser] = useState([]);

  useEffect(() => {
    // fetchProducts("tshirt");
    // fetchProducts("shirt");
    // fetchProducts("trouser");
  }, []);

  const fetchProducts = async (type) => {
    const URL = FILTERED_PRODUCTS + `{"subCategory":"${type}"}`;

    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
    };

    const res = await fetch(URL, { method: "GET", headers });
    const resJSON = await res.json();

    if (type == "tshirt") {
      setTshirt(resJSON.data);
    } else if (type == "shirt") {
      setShirt(resJSON.data);
    } else if (type == "trouser") {
      setTrouser(resJSON.data);
    }
    console.log(resJSON);
  };

  return (
    <div className="px-48">
      <div className="men-banner">
        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/strip/strip.jpg" />
      </div>
      <div className="men-banner text-center text-3xl font-semibold my-16 rounded-lg py-2 bg-yellow-300 ">
        FOR MEN
      </div>
      <div className="tshirt">
        <h1 className="font-bold text-3xl ">T-SHIRTS</h1>
        <p className="mb-6">High On Demand</p>
        <Carousel type="tshirt" products={tshirt} />
      </div>
      <div className="shirt">
        <h1 className="font-bold text-3xl ">SHIRTS</h1>
        <p className="mb-6">Formal To Casual Styles</p>
        <Carousel type="shirt" products={shirt} />
      </div>
      <div className="trouser">
        <h1 className="font-bold text-3xl ">TROUSERS</h1>
        <p className="mb-6">High On Demand</p>
        <Carousel type="trouser" products={trouser} />
      </div>
      <div className="men-banner text-center text-3xl font-semibold my-16 rounded-lg py-2 bg-yellow-300 ">
        FOR WOMEN
      </div>
      <div className="women-clothes"></div>
      <div className="women-banner">
        <img
          src="https://www.beyoung.in/api/catalog/homepage-3-10/bbimages/new/Bhuvan-strip-banner-desktop.jpg"
          alt=""
        />
      </div>
      <div className="shop-the-look ">
        <div className="text-3xl font-semibold my-16 rounded-lg py-2 ">
          SHOP THE LOOK
        </div>
        <div className="flex justify-center gap-4 rounded-lg">
          <img
            className="w-64"
            src="https://www.beyoung.in/api/catalog/homepage-3-10/shop-the-look/1.jpg"
            alt=""
          />
          <img
            className="w-64"
            src="https://www.beyoung.in/api/catalog/homepage-3-10/shop-the-look/2.jpg"
            alt=""
          />
          <img
            className="w-64"
            src="https://www.beyoung.in/api/catalog/homepage-3-10/bbimages/new/3.jpg"
            alt=""
          />
          <img
            className="w-64"
            src="https://www.beyoung.in/api/catalog/homepage-3-10/shop-the-look/4.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="flex featured-on items-center my-16">
        <div className="flex-1 h-1 bg-yellow-300"></div>
        <div className="px-4 text-3xl uppercase font-semibold">FEATURED ON</div>
        <div className="flex-1 h-1 bg-yellow-300"></div>
      </div>
      <div className="subscribe flex my-24 bg-gray-200 p-5">
        <div className="details">
          Basic styles se latest fashion tak ki updates! Get extra savings,
          exclusive Coupons & hell lot of everyday deals DIRECT-TO-YOUR inbox
        </div>
        <input type="text" placeholder="Enter your email address" />
        <button className="bg-primary w-24">I AM IN</button>
      </div>
      <footer></footer>
    </div>
  );
};

export default HomeProducts;
