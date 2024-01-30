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
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  ADD_TO_WISHLIST,
  CART_ACTION,
  DELETE_FROM_WISHLIST,
  GET_MY_WISHLIST,
  headers,
} from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sanitizeHtml from "sanitize-html";
import Login from "../Login";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  const [existInWishlist, setExistInWishlist] = useState(false);
  const token = localStorage.getItem("beyoung_token");

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selected, setSelected] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const navigate = useNavigate("");

  const { id } = useParams();
  // 652675cddaf00355a7838b67
  useEffect(() => {
    fetchProductById();
    isExistInWishlist();
  }, []);

  const [openLoginModal, setLoginModal] = useState(false);

  const toggleLoginModel = () => {
    setLoginModal((prev) => !prev);
  };

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
    console.log("Items", resJSON);
    const exists = resJSON.data.items.find((item) => item.products._id === id);
    console.log("Is exist ?", exists);
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
      const res = await fetch(`${DELETE_FROM_WISHLIST}/${id}`, {
        method: "DELETE",
        headers,
      });
      const resJSON = await res.json();
      console.log("Removed from wishlist!");
      toast.success("Removed from wishlist!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setExistInWishlist(false);
    } else {
      const res = await fetch(ADD_TO_WISHLIST, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ productId: id }),
      });
      console.log("Payload", JSON.stringify({ productId: id }));
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

    setAddedToCart(true);

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

  const buyNow = () => {
    navigate(`/checkout/${id}/${quantity}/${selectedSize}`);
  };

  const fetchProductById = async () => {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`;
    const res = await fetch(url, { method: "GET", headers });

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
      <div className="flex max-md:flex-col max-md:gap-8 gap-16 pt-12">
        <div className="w-1/2 max-md:w-3/4 m-auto h-[100vh]">
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
        <div className="w-1/2 prod-description max-md:w-full">
          <div className="flex justify-between items-center header mb-1">
            <h1 className="font-bold text-xl">{product.name}</h1>
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
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: product.color || "black" }}
              ></div>
            </div>
            <h1 className="mb-2 text-xl">SIZE</h1>
            <div className="size flex items-center gap-2 mb-4">
              {product.size &&
                product.size.map((size) => (
                  <div
                    onClick={(e) => {
                      setSelected(size);
                      setSelectedSize(e.target.innerText);
                    }}
                    className={`${
                      selected === size ? "bg-rose-800 text-white" : ""
                    } cursor-pointer rounded-full px-4 w-10 h-10 flex justify-center items-center border-2 border-rose-800`}
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
            <div className="actions flex max-md:flex-col  gap-2 justify-between mb-8">
              <Button
                className={` ${
                  addedToCart ? "hidden" : "block"
                } py-1 rounded-md w-2/5 max-md:w-full bg-cyan-400`}
              >
                <b className="text-xl mr-2">
                  <FaShoppingCart />
                </b>
                <span
                  className="text-lg"
                  onClick={addToCart}
                  disabled={addedToCart}
                >
                  {!addedToCart ? "ADD TO CART" : <span>Added to cart</span>}
                </span>
              </Button>
              <Button className="py-1 rounded-md w-3/5 max-md:w-full bg-yellow-300">
                <b className="text-2xl mr-2">
                  <IoArrowForwardCircleOutline />
                </b>
                <span className="text-lg" onClick={buyNow}>
                  {" "}
                  BUY NOW
                </span>
              </Button>
            </div>
            <div className="delivery-options mt-4">
              <span className="text-lg font-semibold">DELIVERY OPTIONS</span>
              <div className="options mt-4 p-4 border-2 max-md:mb-4 w-1/2 max-sm:w-full border-black-600">
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
      <div className="description flex max-md:flex-col gap-4 mb-12">
        <div className="bg-stone-100 px-12 py-6 product-details w-3/5 max-md:w-full">
          <h1 className="text-lg font-bold">Product Details</h1>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(product.description),
              }}
            ></div>
          </div>
        </div>
        <div className="bg-stone-100 policy px-12 py-6 w-2/5 max-md:w-full">
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
