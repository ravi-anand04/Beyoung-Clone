import React, { useEffect, useState } from "react";
import Carousel from "../Carousel";
import { FILTERED_PRODUCTS } from "../../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./style.css";
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { headers } from "../../constants";

const HomeProducts = () => {
  const [shirt, setShirt] = useState([]);
  const [tshirt, setTshirt] = useState([]);
  const [trouser, setTrouser] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    fetchProducts("tshirt");
    fetchProducts("shirt");
    fetchProducts("trouser");
    fetchWomenProducts();
  }, []);

  const fetchWomenProducts = async () => {
    const URL = FILTERED_PRODUCTS + `{"gender": "Women"}&limit=8&page=5`;

    const res = await fetch(URL, { method: "GET", headers });
    const resJSON = await res.json();

    setWomenProducts(resJSON.data);
  };

  const fetchProducts = async (type) => {
    let URL = FILTERED_PRODUCTS + `{"subCategory":"${type}"}&limit=8`;

    if (type == "tshirt") {
      URL = FILTERED_PRODUCTS + `{"subCategory":"${type}"}`;
    }

    const res = await fetch(URL, { method: "GET", headers });
    const resJSON = await res.json();

    if (type == "tshirt") {
      setTshirt(resJSON.data);
    } else if (type == "shirt") {
      setShirt(resJSON.data);
    } else if (type == "trouser") {
      setTrouser(resJSON.data);
    }
    // console.log(resJSON);
  };

  return (
    <div className="px-48 max-xl:px-8 max-sm:px-1">
      <div className="men-banner">
        <img src="https://www.beyoung.in/api/catalog/homepage-3-10/desktop/strip/strip.jpg" />
      </div>
      <div className="men-banner text-center font-semibold font-sans text-2xl my-16 max-sm:my-6 rounded-lg py-2 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100">
        FOR MEN
      </div>
      <div className="tshirt">
        <span className="font-bold text-2xl border-l-4 border-yellow-300 px-2">
          T-SHIRTS
        </span>
        <p className="mb-6 ml-4 font-light text-md">High On Demand</p>
        <div className="flex gap-6 items-center mb-16">
          <img
            src="https://www.beyoung.in/api/catalog/homepage-3-10/T-shirt-section/new/9.jpg"
            alt=""
            className="w-2/5 rounded-xl"
          />
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
              fill: "row",
            }}
            rewind={true}
            spaceBetween={24}
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                width: 768,
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1024: {
                width: 1024,
                slidesPerView: 5,
                spaceBetween: 16,
              },
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Grid, Pagination, Navigation, Autoplay]}
            className="w-3/5"
          >
            {tshirt &&
              tshirt.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item.displayImage} className="rounded-xl" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <div className="shirt mb-16 max-sm:m-1">
        <span className="font-bold text-2xl border-l-4 border-yellow-300 px-2">
          SHIRTS
        </span>
        <p className="mb-6 ml-4 font-light text-md">Formal To Casual Styles</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          rewind={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {shirt &&
            shirt.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.displayImage} className="rounded-xl" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="trouser mb-16 max-sm:my-8">
        <span className="font-bold text-2xl border-l-4 border-yellow-300 px-2">
          TROUSERS
        </span>
        <p className="mb-6 ml-4 font-light text-md">High On Demand</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          rewind={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {trouser &&
            trouser.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.displayImage} className="rounded-xl" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="men-banner text-center font-semibold font-sans text-2xl  my-16 max-sm:my-8 rounded-lg py-2 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100">
        FOR WOMEN
      </div>
      <div className="trouser mb-16 max-sm:my-8">
        <span className="font-bold text-2xl border-l-4 border-yellow-300 px-2">
          Products
        </span>
        <p className="mb-6 ml-4 font-light text-md">High On Demand</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          rewind={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {womenProducts &&
            womenProducts.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.displayImage} className="rounded-xl" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="women-banner">
        <img
          src="https://www.beyoung.in/api/catalog/homepage-3-10/bbimages/new/Bhuvan-strip-banner-desktop.jpg"
          alt=""
        />
      </div>
      <div className="shop-the-look ">
        <div className="text-3xl font-bold my-16 max-sm:my-8 border-l-4 border-yellow-300 px-2">
          SHOP THE LOOK
        </div>
        <div className="flex flex-wrap justify-center gap-4 rounded-lg">
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
      <div className="flex featured-on items-center my-16 max-sm:my-8">
        <div className="flex-1 h-1 bg-yellow-300 max-sm:hidden"></div>
        <div className="px-4 text-2xl uppercase font-bold max-sm:border-l-4 max-sm:border-yellow-300 max-sm:px-2">
          FEATURED ON
        </div>
        <div className="flex-1 h-1 bg-yellow-300 max-sm:hidden"></div>
      </div>
      <div className="subscribe flex my-24 max-sm:my-8 bg-gray-200 p-5">
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
