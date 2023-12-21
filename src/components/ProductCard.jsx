import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import placeholder_img from "../assets/images/placeholder-image-square.jpg";

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
    images
  } = product;

  // useEffect(() => {
  //   const imageCheck = async () => {
  //     const res = await fetch(displayImage);
  //     const resJSON = await res.json();

  //     if (resJSON === "Not Found") {
  //       displayImage = `https://placehold.co/600x400?text=Image+Not+Found`;
  //     }
  //   };

  //   imageCheck();
  // }, []);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div onClick={handleRedirect}>
      <div className="w-[250px] min-h-[450px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={displayImage} />
          {/* {typeof displayImage === "string" && displayImage.trim() !== "Not Found" ? (
            <img className="rounded-t-lg" src={displayImage} alt="Image" />
          ) : (
            <img
              className="rounded-t-lg"
              src="https://placehold.co/600x400?text=Image+Not+Found"
              alt="Image Not Found"
            />
          )} */}
        </a>
        <div className="p-5">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
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
