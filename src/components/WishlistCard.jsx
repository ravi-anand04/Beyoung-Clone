import React from "react";
import { FaStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_FROM_WISHLIST } from "../constants";

const WishlistCard = ({ product }) => {
  const { _id, name, price, displayImage, ratings } = product.products;
  const token = localStorage.getItem("beyoung_token");
  const navigate = useNavigate();

  const updateWishList = async (e) => {
    e.stopPropagation();

    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(`${DELETE_FROM_WISHLIST}/${_id}`, {
      method: "DELETE",
      headers,
    });

    const resJSON = await res.json();
    console.log("Removed from wishlist!");
    console.log(resJSON);

    window.location.reload();
  };

  const handleRedirect = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div onClick={handleRedirect}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[280px] h-[450px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg object-contain" src={displayImage} />
        </a>
        <div className="p-5">
          <div className="head flex gap-8 justify-between items-start">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <div
              className="wishlist text-2xl cursor-pointer"
              onClick={updateWishList}
            >
              <ImCross className="text-red-500 text-lg mt-2" />
            </div>
          </div>

          <div className="flex justify-between details">
            <span className="font-bold">₹ {price} </span>
            <span className="flex gap-2 items-center">
              <FaStar />
              {parseFloat(ratings?.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
