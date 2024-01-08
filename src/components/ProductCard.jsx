import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import placeholder_img from "../assets/images/placeholder-image-square.jpg";
import { IoIosHeartEmpty } from "react-icons/io";

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

  useEffect(() => {
    const imageCheck = async () => {
      try {
        const res = await fetch(displayImage);
        if (res.ok && res.headers.get("content-type")?.startsWith("image")) {
          setImageUrl(displayImage);
        } else {
          setImageUrl("https://placehold.co/600x500?text=Image+Not+Found");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl("https://placehold.co/600x500?text=Image+Not+Found");
      }
    };
    imageCheck();
  }, []);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div onClick={handleRedirect}>
      <div className="w-[280px] h-[500px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg object-contain" src={imageUrl} />
        </a>
        <div className="p-5">
          <div className="head flex gap-4 justify-between items-center">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <div className="wishlist text-xl">
              <IoIosHeartEmpty />
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
          <span className="text-green-500 font-bold">{gender}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
