import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Badge, Button, Dropdown, List } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { CART_ACTION, headers } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sanitizeHtml from "sanitize-html";
import Login from "../Login";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();
  // 652675cddaf00355a7838b67
  useEffect(() => {
    fetchProductById();
  }, []);

  const [openLoginModal, setLoginModal] = useState(false);

  const toggleLoginModel = () => {
    setLoginModal((prev) => !prev);
  };

  // const checkIfProductExists = async () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     projectId: process.env.PROJECT_ID,
  //     Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
  //   };

  //   const url = `${CART_ACTION}`;

  //   const res = await fetch(url);

  //   const resJSON = await res.json();

  //   const exists = false;

  //   const isExist = resJSON.items.filter((product) => {
  //     if (product._id === id) {
  //       exists = true;
  //     }
  //   });

  //   return exists;
  // };

  const addToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select product size", {
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
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    };

    const url = `${CART_ACTION}/${id}`;
    const payload = {
      quantity,
      size: selectedSize,
    };

    console.log("Quantity before cart", quantity);

    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });

    const resJSON = await res.json();

    console.log("Message", resJSON.message);

    if (resJSON.message == "Invalid token. Please log in again!") {
      toggleLoginModel();
      return;
    }
    console.log(resJSON);

    toast.success("Added to Cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchProductById = async () => {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`;
    const res = await fetch(url, { method: "GET", headers });
    console.log("URL", url);

    if (res.status != "fail") {
      const resJSON = await res.json();
      setProduct(resJSON.data);
      setImages([...resJSON.data.images], resJSON.data.displayImage);
    }
  };

  return (
    <div className="px-48 max-xl:px-8">
      <Login
        openLoginModal={openLoginModal}
        toggleLoginModel={toggleLoginModel}
      />
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
      <div className="flex gap-16 pt-12">
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
            {images &&
              images.map((image, index) => (
                <SwiperSlide>
                  <img key={index} src={image} />
                </SwiperSlide>
              ))}
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
            {images &&
              images.map((image, index) => (
                <SwiperSlide>
                  <img key={index} src={image} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="w-1/2 prod-description">
          <div className="flex justify-between items-center header mb-1">
            <h1 className="font-bold text-xl">{product.name}</h1>
            <IoIosHeartEmpty size={22} />
          </div>
          <div className="category text-md font-light mb-2">
            <p>
              {product.subCategory &&
                product.subCategory.charAt(0).toUpperCase() +
                  product.subCategory.slice(1)}
            </p>
          </div>
          <div className="price flex items-center gap-3 mb-1">
            <b className="text-xl">₹ {product.price}</b>
            <b className="text-xl line-through font-light text-stone-400">
              ₹ {product.price * 2}
            </b>
            <span className="text-green-500 font-semibold text-lg">
              (50% off)
            </span>
          </div>
          <div className="category font-light mb-4">
            <span className="font-semibold text-zinc-500">
              Inclusive of All Taxes + Free Shipping
            </span>
          </div>
          <div className="offers text-sm mb-4">
            <List>
              <List.Item>
                Get Extra ₹100 OFF on ₹999 (Code: Beyoung100)
              </List.Item>
              <List.Item>Get Flat ₹250 OFF on ₹1999 (Code: Get250)</List.Item>
              <List.Item>Get Flat ₹500 OFF on ₹2999 (Code: Get500)</List.Item>
            </List>
          </div>
          <div>
            <hr />
            <div className="color items-center gap-2 my-4">
              <div className="text-xl mb-2">COLOR</div>
              <div
                class="w-10 h-10 rounded-full"
                style={{ backgroundColor: product.color || "black" }}
              ></div>
            </div>
            <h1 className="mb-2 text-xl">SIZE</h1>
            <div className="size flex items-center gap-2 mb-4">
              {product.size &&
                product.size.map((size) => (
                  <div
                    onClick={(e) => setSelectedSize(e.target.innerText)}
                    className="cursor-pointer rounded-full px-4 w-10 h-10 flex justify-center items-center border-2 border-rose-800"
                  >
                    {size}
                  </div>
                ))}
            </div>
            <div className="quantity mb-8">
              <select onChange={(e) => setQuantity(parseInt(e.target.value))}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="actions flex gap-2 justify-between mb-8">
              <Button className="py-1 rounded-md w-2/5 bg-cyan-400">
                <b className="text-xl mr-2">
                  <FaShoppingCart />
                </b>
                <span className="text-lg" onClick={addToCart}>
                  {" "}
                  ADD TO CART
                </span>
              </Button>
              <Button className="py-1 rounded-md w-3/5 bg-yellow-300">
                <b className="text-2xl mr-2">
                  <IoArrowForwardCircleOutline />
                </b>
                <span className="text-lg"> BUY NOW</span>
              </Button>
            </div>
            <div className="delivery-options mt-4">
              <span className="text-lg font-semibold">DELIVERY OPTIONS</span>
              <div className="options mt-4 p-4 border-2 border-black-600">
                <span className="flex gap-4 items-center">
                  <GiCash className="text-lg" /> Cash On Delivery
                </span>
                <span className="flex gap-4 items-center">
                  <FaShippingFast className="text-lg" /> Express Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description flex gap-4 mb-12">
        <div className="bg-stone-100 px-12 py-6 product-details w-3/5">
          <h1 className="text-lg font-bold">Product Details</h1>
          <p>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(product.description),
              }}
            ></div>
          </p>
        </div>
        <div className="bg-stone-100 policy px-12 py-6 w-2/5">
          <h1 className="text-lg font-bold">Delivery & Return Policy</h1>
          <p className="text-md mb-4">
            We provide free shipping on all orders. Pay online to avoid charges
            of ₹50/product applicable on COD orders. The return or exchange can
            be done within 15 days after delivery. Every delivery from Beyoung
            is processed under excellent condition and in the fastest time
            possible. For our beloved customer’s care, we give contactless
            delivery. Refer to FAQ for more information.
          </p>
          <a href="/">
            <b>support@beyoung.in</b>
          </a>
        </div>
      </div>
      <div className="reviews"></div>
    </div>
  );
};

export default Product;