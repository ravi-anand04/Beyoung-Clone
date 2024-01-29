import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import placeholder_img from "../assets/images/placeholder-image-square.jpg";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  GET_MY_WISHLIST,
} from "../constants";

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    brand,
    subCategory,
    size,
    color,
    gender,
    displayImage,
    ratings,
    sellerTag,
    images,
  } = product;

  const [imageUrl, setImageUrl] = useState(displayImage);
  const [existInWishlist, setExistInWishlist] = useState(false);
  const token = localStorage.getItem("beyoung_token");

  useEffect(() => {
    const imageCheck = async () => {
      try {
        const res = await fetch(displayImage);
        if (res.ok && res.headers.get("content-type")?.startsWith("image")) {
          setImageUrl(displayImage);
        } else {
          setImageUrl("https://placehold.co/600x600?text=Image+Not+Found");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl("https://placehold.co/600x600?text=Image+Not+Found");
      }
    };
    imageCheck();
    isExistInWishlist();
  }, []);

  const isExistInWishlist = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(GET_MY_WISHLIST, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    // console.log("Items", resJSON);
    const exists = resJSON.data.items.find((item) => item.products._id === _id);
    // console.log("Is exist ?", exists);
    setExistInWishlist(exists ? true : false);
    return exists;
  };

  const updateWishList = async (e) => {
    e.stopPropagation();
    if (!token) {
      toast.error("You need to login first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${token}`,
    };

    if (await isExistInWishlist()) {
      // console.log(isExistInWishlist());
      const res = await fetch(`${DELETE_FROM_WISHLIST}/${_id}`, {
        method: "DELETE",
        headers,
      });
      const resJSON = await res.json();
      console.log("Removed from wishlist!");
      console.log(resJSON);
      setExistInWishlist(false);
    } else {
      const res = await fetch(ADD_TO_WISHLIST, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ productId: _id }),
      });
      console.log("Payload", JSON.stringify({ productId: _id }));
      const resJSON = await res.json();
      console.log(resJSON);
      console.log("Added to wishlist!");
      toast.success("Product added to wishlist!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setExistInWishlist(true);
    }
  };

  const navigate = useNavigate();

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
      <div className="w-[280px] h-[500px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg object-contain" src={imageUrl} />
        </a>
        <div className="p-5">
          <div className="head flex gap-4 justify-between items-start">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <div
              className="wishlist text-2xl cursor-pointer"
              onClick={updateWishList}
            >
              {existInWishlist ? (
                <IoIosHeart className="text-red-500 mt-2" />
              ) : (
                <IoIosHeartEmpty className="mt-2" />
              )}
            </div>
          </div>
          <h5 className="mb-3 text-sm font-light tracking-tight text-gray-900 dark:text-white">
            {sellerTag.toUpperCase()}
          </h5>

          <div className="flex justify-between details">
            <span className="font-bold">₹ {price} </span>
            <span className="flex gap-2 items-center">
              <FaStar />
              {parseFloat(ratings.toFixed(2))}
            </span>
          </div>
          <span className="text-green-500 font-bold ml-3">{gender}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
