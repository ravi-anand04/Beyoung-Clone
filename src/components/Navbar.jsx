import React, { useEffect, useState } from "react";
import BeyoungLogo from "../assets/icons/BeyoungLogo";
import { IoIosHeartEmpty, IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CART_ACTION, CATEGORIES } from "../constants";
import { Button, Dropdown } from "flowbite-react";
import Input from "./Input";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Link, useNavigate } from "react-router-dom";
import { person } from "../username";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [menDropdown, setMenDropdown] = useState(false);
  const [womenDropdown, setWomenDropdown] = useState(false);
  const [name, setName] = useState("");
  const [cartLength, setCartLength] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    setIsLoggedIn(!!localStorage.getItem("beyoung_token"));
    if (localStorage.getItem("beyoung_token")) {
      fetchCartQuantity();
    }
  }, []);

  const fetchCartQuantity = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
      projectID: process.env.PROJECT_ID,
    };

    const res = await fetch(CART_ACTION, { method: "GET", headers });

    if (res.ok) {
      const resJSON = await res.json();
      console.log("Cart length", resJSON.data.items.length);
      setCartLength(resJSON.data.items.length);
    }
  };

  useEffect(() => {}, [name]);

  const fetchCategories = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
    };

    const res = await fetch(CATEGORIES, { method: "GET", headers });
    const data = await res.json();

    setCategories(data.data);
  };

  const togglesearchbar = () => {
    setSearchBar((prev) => !prev);
  };

  const updateName = (value) => {
    setName(value);
  };

  const [openLoginModal, setLoginModal] = useState(false);
  const [openRegisterModal, setRegisterModal] = useState(false);

  const toggleLoginModel = () => {
    setLoginModal((prev) => !prev);
  };

  const toggleRegisterModel = () => {
    setRegisterModal((prev) => !prev);
  };

  const redirectToCart = () => {
    navigate("/checkout");
  };

  const handleHover = (type) => {
    if (type === "men") {
      setMenDropdown((prev) => !prev);
      setWomenDropdown(false);
    } else {
      setWomenDropdown((prev) => !prev);
      setMenDropdown(false);
    }
  };

  // const handleLeave = (type) => {
  //   if (type === "men") {
  //     setMenDropdown((prev) => !prev);
  //   } else {
  //     setWomenDropdown((prev) => !prev);
  //   }
  // };

  return (
    <div className="sticky top-0 shadow-xl z-10">
      <div className="nav-top flex justify-between py-1 text-white bg-black px-48 max-lg:px-12 max-sm:px-1">
        <div className="flex gap-2 items-center cursor-pointer">
          <SlLocationPin className="text-xl" />
          <Link to="/track">TRACK YOUR ORDER</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <span className="cursor-pointer">
                {" "}
                Welcome, {localStorage.getItem("beyoung_name")} |{" "}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("beyoung_name");
                  localStorage.removeItem("beyoung_token");
                  window.location.reload();
                }}
              >
                Logout{" "}
              </span>
            </>
          ) : (
            <>
              <span
                className="cursor-pointer"
                onClick={() => setLoginModal(true)}
              >
                LOG IN |
              </span>

              <Login
                openLoginModal={openLoginModal}
                toggleLoginModel={toggleLoginModel}
                toggleRegisterModel={toggleRegisterModel}
                updateName={updateName}
              />
              <span
                className="cursor-pointer"
                onClick={() => setRegisterModal(true)}
              >
                {" "}
                SIGNUP
              </span>
              <Register
                openRegisterModal={openRegisterModal}
                toggleRegisterModel={toggleRegisterModel}
                toggleLoginModel={toggleLoginModel}
              />
            </>
          )}
        </div>
      </div>
      <div className="nav-bottom flex flex-wrap max-sm:justify-center bg-white justify-between px-48 max-lg:px-12 max-sm:px-1 py-3">
        <ul className="flex items-center gap-12 max-md:gap-4 max-sm:gap-2">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            <BeyoungLogo />
          </li>

          <h1
            className="hover:bg-yellow-100 p-4 font-bold text-lg"
            onMouseEnter={() => handleHover("men")}
          >
            SHOP BY CATEGORY
          </h1>
        </ul>

        <div className="flex items-center gap-5">
          <div
            className="search cursor-pointer"
            onClick={() => {
              setSearchBar((prev) => !prev);
            }}
          >
            <IoIosSearch size={22} />
          </div>
          <div
            className="wishlist cursor-pointer"
            onClick={() => navigate("/wishlist")}
          >
            <IoIosHeartEmpty size={22} />
          </div>
          <button
            type="button"
            className="relative inline-flex items-center text-sm font-medium text-center text-black rounded-lg"
          >
            <div className="cart cursor-pointer" onClick={redirectToCart}>
              <AiOutlineShoppingCart size={22} />
            </div>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-2 dark:border-gray-900">
              {cartLength}
            </div>
          </button>
        </div>
      </div>

      <div className="SearchBar">
        {searchBar && <Input togglesearchbar={togglesearchbar} />}
      </div>

      <div
        className="px-48 max-lg:px-12 max-sm:px-1 men bg-white"
        onMouseLeave={() => setMenDropdown(false)}
      >
        {menDropdown && (
          <div className="flex justify-center gap-4 flex-wrap p-2">
            {categories.length > 0 &&
              categories.map((category) => (
                <h1
                  onClick={() => {
                    navigate(`/search/${category}`);
                    window.location.reload();
                  }}
                  className="hover:bg-stone-200 px-4 py-2 rounded-lg cursor-pointer"
                >
                  {category.charAt(0).toUpperCase() + category.substring(1)}
                </h1>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
