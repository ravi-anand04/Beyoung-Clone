import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Badge, Button, Dropdown } from "flowbite-react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const { id } = useParams();
  // 652675cddaf00355a7838b67
  useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
    };
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`;
    const res = await fetch(url, { method: "GET", headers });
    console.log("URL", url);

    if (res.status != "fail") {
      const resJSON = await res.json();
      console.log("Array", resJSON.data.size);
      setProduct(resJSON.data);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex gap-16 px-48 max-xl:px-8 pt-12">
      <div className="w-1/2">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/2 prod-description">
        <div className="flex justify-between items-center header mb-1">
          <h1 className="font-bold text-xl">
            Sand Brown Solid Urban Shirt for Men
          </h1>
          <p>Add to Wishlist</p>
        </div>
        <div className="category text-md font-light mb-2">
          {/* <p>{product.subCategory.toUpperCase()}</p> */}
        </div>
        <div className="price mb-1">
          <b className="text-2xl">₹ {product.price}</b>
        </div>
        <div className="category font-light mb-4">
          <span className="font-semibold text-stone-900">
            Inclusive of All Taxes + Free Shipping
          </span>
        </div>
        <div>
          <hr />
          <div className="color flex items-center gap-2 my-4">
            <h1 className="text-lg">COLOR : </h1>
            <Badge color="dark" size="lg">
              {product.color}
            </Badge>
          </div>
          <h1 className="mb-2 text-xl">SIZE</h1>
          <div className="size flex items-center gap-2 mb-4">
            {product.size &&
              product.size.map((size) => (
                <div className="rounded-full px-4 border-2 border-rose-800">
                  {size}
                </div>
              ))}
          </div>
          <div className="quantity mb-16">
            <Dropdown label="Quantity" size="sm" dismissOnClick={false}>
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
              <Dropdown.Item>4</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="actions flex gap-4 justify-between">
            <Button className="p-2 w-2/5 bg-cyan-400">ADD TO CART</Button>
            <Button className="p-2 w-3/5 bg-yellow-300">BUY NOW</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
