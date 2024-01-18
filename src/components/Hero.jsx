import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/shirt`);
  };

  return (
    <div className="">
      <div className="main">
        <a href="">
          <img
            src="https://www.beyoung.in/api/catalog/homepage-28-11/main-banner/SHIRT-BANNER-DESKTOP-VIEW.jpg"
            alt=""
            className="max-sm:hidden"
            onClick={handleClick}
          />
        </a>
      </div>
      <div className="shipping px-48 max-xl:px-8 mt-8 mb-12 max-xl:mb-4 max-sm:my-2 max-sm:p-1">
        <img
          src="https://www.beyoung.in/api/catalog/homepage-5-dec/desktop/desktop-free-shipping11.png"
          alt=""
        />
      </div>
      <div className="combo px-48 max-xl:px-8 mt-8 mb-12 max-xl:mb-4 max-sm:my-2 max-sm:p-1">
        <img
          src="https://www.beyoung.in/api/catalog/homepage-5-dec/desktop/Combo-banner-view-22.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
