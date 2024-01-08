import React, { useEffect, useState } from "react";
import BeyoungLogo from "../assets/icons/BeyoungLogo";
import { IoIosHeartEmpty, IoIosSearch } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CATEGORIES } from "../constants";
import { Button, Dropdown } from "flowbite-react";
import Input from "./Input";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [searchBar, setSearchBar] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    setIsLoggedIn(!!localStorage.getItem("beyoung_token"));
  }, []);

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

  return (
    <div className="sticky top-0 shadow-xl z-10 ">
      <div className="nav-top flex justify-between py-1 text-white bg-black px-48 max-lg:px-12 max-sm:px-1">
        <div className="">
          <a>TRACK YOUR ORDER</a>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <span className="cursor-pointer">MY ACCOUNT | </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("beyoung_token");
                  window.location.reload();
                }}
              >
                LOGOUT{" "}
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
              />
            </>
          )}
        </div>
      </div>
      <div className="nav-bottom flex bg-white justify-between px-48 max-lg:px-12 max-sm:px-1 py-3">
        <ul className="flex items-center gap-12 max-md:gap-4">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            <BeyoungLogo />
          </li>

          <li className="max-sm:hidden">
            <Dropdown label="MEN" dismissOnClick={false}>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => navigate(`/search/${category}`)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </li>
          <li className="max-sm:hidden">
            <Dropdown label="WOMEN" dismissOnClick={false}>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => navigate(`/search/${category}`)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <div
            className="search cursor-pointer"
            onClick={() => setSearchBar((prev) => !prev)}
          >
            <IoIosSearch size={22} />
          </div>
          <div className="wishlist cursor-pointer">
            <IoIosHeartEmpty size={22} />
          </div>
          <div className="cart cursor-pointer" onClick={redirectToCart}>
            <AiOutlineShoppingCart size={22} />
          </div>
        </div>
      </div>
      <div className="SearchBar">
        {searchBar && <Input togglesearchbar={togglesearchbar} />}
      </div>
    </div>
  );
};

export default Navbar;
