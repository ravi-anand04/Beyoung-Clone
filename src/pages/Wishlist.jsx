import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { GET_MY_WISHLIST } from "../constants";
import WishlistCard from "../components/WishlistCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("beyoung_token");

  useEffect(() => {
    if (token) fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    };

    const res = await fetch(GET_MY_WISHLIST, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();

    console.log("Items", resJSON.data.items);

    setProducts(resJSON.data.items);

    console.log("Wishlist", resJSON);
  };

  return (
    <div className="px-48 max-xl:px-12 max-sm:px-1 my-10">
      <h1 className="text-3xl font-bold mb-10 border-l-4 border-yellow-300 pl-4">Wishlist</h1>
      {!token ? (
        <h1 className="text-4xl font-bold flex justify-center">
          You need to <Link to="/" className="text-cyan-500 mx-2 hover:underline">Login</Link> first
        </h1>
      ) : (
        <div className="products flex flex-wrap gap-8 justify-center">
          {products.length > 0 &&
            products.map((product, index) => (
              <WishlistCard key={index} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
