import { Button, Card, Tabs } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { ADD_TO_ORDER, CART_ACTION } from "../../constants";
import AddressForm from "../../components/AddressForm";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LoginFirst from "../../components/LoginFirst";
import { IoTrashBinSharp } from "react-icons/io5";

const Checkout = () => {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [item, setItem] = useState({});
  const [totalItems, setTotalItems] = useState([]);
  const [token, setToken] = useState(false);

  const { id, quantity, size } = useParams();

  // console.log(useParams());

  const [tabStatus, setTabStatus] = useState({
    cartdisabled: false,
    shippingDisabled: true,
    paymentDisabled: true,
  });

  // const [address, setAddress] = useState({
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   phone: "",
  //   pin: "",
  //   town: "",
  //   city: "",
  //   state: "",
  //   fullAddress: "",
  // });

  const [address, setAddress] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchItem();
    } else {
      fetchCartItems();
    }
    console.log("first", size);
    setToken(localStorage.getItem("beyoung_token") ? true : false);
  }, []);

  const fetchItem = async () => {
    const headers = {
      projectID: process.env.PROJECT_ID,
    };

    const res = await fetch(
      `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
      { method: "GET", headers }
    );

    const resJSON = await res.json();
    // console.log("Buy now", resJSON.data);
    setItem(resJSON.data);
  };

  const fetchCartItems = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
      projectID: process.env.PROJECT_ID,
    };

    const res = await fetch(CART_ACTION, { method: "GET", headers });

    const resJSON = await res.json();

    setCartItems(resJSON.data);
    setTotalItems(resJSON.results);
  };

  const shippingTabChange = () => {
    setTabStatus((prev) => {
      return {
        ...prev,
        shippingDisabled: false,
      };
    });

    tabsRef.current?.setActiveTab(1);
  };

  const paymentTabChange = () => {
    if (shippingCheckout()) {
      setTabStatus((prev) => {
        return {
          ...prev,
          paymentDisabled: false,
        };
      });

      tabsRef.current?.setActiveTab(2);
    }
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    projectID: process.env.PROJECT_ID,
    "Content-Type": "application/json",
  };

  const finalCartCheckout = async () => {
    const { street, city, state, country, zipCode } = address;
    console.log("Address fully", address);
    console.log("Item carts", cartItems);

    cartItems.items.forEach(async (cartItem) => {
      const { _id } = cartItem.product;
      console.log(cartItem.quantity);
      const payload = JSON.stringify({
        productId: _id,
        quantity: cartItem.quantity,
        addressType: "HOME",
        address: {
          street,
          city,
          state,
          country,
          zipCode,
        },
      });

      console.log("Payload", payload);

      const res = await fetch(ADD_TO_ORDER, {
        method: "POST",
        headers,
        body: payload,
      });
      const resJSON = await res.json();
      console.log("pRODUCT ordered", resJSON);
      toast.success("Payment Successful. Redirecting to orders page!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      clearCart();

      setTimeout(() => {
        navigate("/track");
      }, 4000);
    });
  };

  const finalBuyCheckout = async () => {
    const { street, city, state, country, zipCode } = address;

    const payload = JSON.stringify({
      productId: id,
      quantity: parseInt(quantity),
      addressType: "HOME",
      address: {
        street,
        city,
        state,
        country,
        zipCode,
      },
    });

    const res = await fetch(ADD_TO_ORDER, {
      method: "POST",
      headers,
      body: payload,
    });

    const resJSON = await res.json();

    console.log("Order", resJSON);
    toast.success("Payment Successful. Redirecting to orders page!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/track");
    }, 4000);

    clearCart();
  };

  const shippingCheckout = () => {
    const {
      lname,
      fname,
      phone,
      email,
      street,
      city,
      state,
      country,
      zipCode,
    } = address;

    if (
      !fname ||
      !lname ||
      !phone ||
      !email ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zipCode
    ) {
      toast.error("Invalid address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return false;
    }
    return true;
  };

  const clearCart = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    };

    const res = await fetch(`${CART_ACTION}`, {
      method: "DELETE",
      headers,
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  const removeFromCart = async (item) => {
    // console.log(item);
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    };

    const res = await fetch(`${CART_ACTION}/${item.product._id}`, {
      method: "DELETE",
      headers,
    });

    const resJSON = await res.json();

    console.log(resJSON);

    window.location.reload();
  };

  return (
    <>
      {!token ? (
        <LoginFirst />
      ) : (
        <div>
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

          {cartItems == [] || cartItems.totalPrice === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img src="https://www.beyoung.in/desktop/images/checkout/EMPTY CARTORDER PAGE..png" />
              <Button
                color="dark"
                size="lg"
                className="px-36 mb-4"
                onClick={() => navigate("/")}
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-48 max-xl:px-8 bg-slate-100">
              {cartItems.items && (
                <Tabs
                  aria-label="Default tabs"
                  style="default"
                  ref={tabsRef}
                  onActiveTabChange={(tab) => setActiveTab(tab)}
                  className="flex justify-around mt-5"
                >
                  <Tabs.Item
                    active={tabStatus.cartActive}
                    disabled={tabStatus.cartdisabled}
                    title="CART"
                    icon={HiUserCircle}
                  >
                    <div className="flex max-lg:flex-col gap-6">
                      <div className="product border-stone-300 w-3/5 max-lg:w-full">
                        <div className="product flex flex-col max-md:items-center gap-4">
                          <h1
                            className="text-lg font-bold flex items-center gap-2 cursor-pointer"
                            onClick={clearCart}
                          >
                            <IoTrashBinSharp /> Clear Cart
                          </h1>
                          {cartItems.items.map((item) => (
                            <a
                              href="#"
                              className="flex flex-col p-4 max-md:p-2 items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              <img
                                className="object-cover max-md:h-48 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                src={item.product.displayImage}
                                alt="Image not found"
                              />
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                  {item.product.name}
                                </h5>
                                <div className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                                  <div className="price flex items-center gap-2 mb-1">
                                    <b className="text-md">
                                      ₹ {item.product.price * item.quantity}
                                    </b>
                                    <b className="text-md line-through font-light text-stone-400">
                                      ₹ {item.product.price * item.quantity * 2}
                                    </b>
                                    <span className="text-green-500 text-md">
                                      (50% off)
                                    </span>
                                  </div>
                                  <b className="text-md font-light text-stone-400">
                                    You save ₹{" "}
                                    <span className="text-green-500">
                                      {item.product.price * item.quantity}
                                    </span>
                                  </b>
                                  <hr className="mt-4" />
                                  <div className="flex justify-between items-center">
                                    <div className="my-2 flex gap-2 items-center">
                                      <span className="font-bold text-stone-600">
                                        Qty:
                                      </span>
                                      <div className="item-quantity flex flex-col justify-center items-center">
                                        <IoIosArrowUp />
                                        {item.quantity}
                                        <IoIosArrowDown />
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="font-bold text-stone-600">
                                        Size:
                                      </span>
                                      <span>{item.size}</span>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                                <div className="actions flex justify-center mt-6">
                                  <span
                                    className="px-2 font-semibold cursor-pointer py-2 text-white text-center rounded-lg bg-rose-600 w-full"
                                    onClick={() => removeFromCart(item)}
                                  >
                                    Remove
                                  </span>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="final-price flex flex-col rounded-xl shadow-2xl border-stone-300 w-2/5  max-lg:w-full p-5 h-96 bg-white sticky top-40">
                        <div className="price-details flex flex-col gap-4 flex-shrink">
                          <div className="flex justify-between">
                            <span className="font-semibold text-xl">
                              PRICE DETAILS ({totalItems} items)
                            </span>
                          </div>
                          <hr />
                          <div className="flex justify-between">
                            <span>Total MRP (Inc. of Taxes)</span> ₹
                            {cartItems.totalPrice * 2}
                          </div>
                          <div className="flex justify-between">
                            <span>Beyoung Discount</span>₹{" "}
                            {cartItems.totalPrice}
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <div className="line-through font-light">₹49</div>
                          </div>
                          <div className="flex justify-between">
                            <span>Cart Total</span>₹ {cartItems.totalPrice}
                          </div>
                        </div>
                        <div className="total-amount">
                          <div className="flex justify-between font-bold  text-lg mt-4">
                            <span>Total Amount</span>₹ {cartItems.totalPrice}
                          </div>
                          <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                            You Saved ₹ {cartItems.totalPrice} on this order
                          </span>
                          <Button
                            className="w-full py-1 my-2 rounded-sm"
                            gradientMonochrome="success"
                          >
                            <span
                              className="text-xl"
                              onClick={shippingTabChange}
                            >
                              CHECKOUT SECURELY
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                  {/* SHIPPING TAB */}
                  <Tabs.Item
                    disabled={tabStatus.shippingDisabled}
                    active={tabStatus.shippingActive}
                    title="SHIPPING"
                    icon={MdDashboard}
                  >
                    <div className="flex max-md:flex-col gap-6">
                      <div className="address w-3/5 max-md:w-full">
                        {!token && (
                          <div className="without-login">
                            <div className="login-check text-center flex gap-4 justify-center items-center">
                              <span>Already have an account?</span>
                              <Button
                                color="gray"
                                className="border-2 rounded-sm border-cyan-500 text-cyan-500 px-2"
                                size="xs"
                                onClick={() => navigate(`/`)}
                              >
                                Login/Signup
                              </Button>
                            </div>
                            <h1 className="flex justify-center">Or</h1>
                            <h1 className="flex justify-center mb-2">
                              Checkout as Guest
                            </h1>
                          </div>
                        )}
                        <div className="delivery-address">
                          <AddressForm
                            address={address}
                            setAddress={setAddress}
                          />
                        </div>
                      </div>
                      <div className="final-price flex flex-col justify-between rounded-xl shadow-2xl border-stone-300 w-2/5 max-md:w-full p-5 h-96 bg-white sticky top-40">
                        <div className="price-details flex flex-col gap-4">
                          <div className="flex justify-between">
                            <span className="font-semibold text-xl">
                              PRICE DETAILS ({totalItems} items)
                            </span>
                          </div>
                          <hr />
                          <div className="flex justify-between">
                            <span>Total MRP (Inc. of Taxes)</span> ₹
                            {cartItems.totalPrice * 2}
                          </div>
                          <div className="flex justify-between">
                            <span>Beyoung Discount</span>₹{" "}
                            {cartItems.totalPrice}
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <div className="line-through font-light">₹49</div>
                          </div>
                          <div className="flex justify-between">
                            <span>Cart Total</span>₹ {cartItems.totalPrice}
                          </div>
                        </div>
                        <div className="total-amount">
                          <div className="flex justify-between font-bold  text-lg mt-4">
                            <span>Total Amount</span>₹ {cartItems.totalPrice}
                          </div>
                          <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                            You Saved ₹ {cartItems.totalPrice} on this order
                          </span>
                          <Button
                            className="w-full py-1 my-2 rounded-sm"
                            gradientMonochrome="success"
                          >
                            <span
                              className="text-xl"
                              onClick={paymentTabChange}
                            >
                              CHECKOUT SECURELY
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item
                    disabled={tabStatus.paymentDisabled}
                    active={tabStatus.paymentActive}
                    title="PAYMENT"
                    icon={MdDashboard}
                  >
                    <div className="flex max-md:flex-col gap-6">
                      <div className="payment w-3/5 flex max-md:flex-col gap-4 max-md:w-full">
                        <div className="pay-options w-2/5 max-md:w-full flex flex-col gap-2">
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            Pay With Paytm
                          </div>
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            Debit/Credit Card
                          </div>
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            UPI
                            <h2>google Pay, Phone Pay, & More+</h2>
                          </div>
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            Wallets
                            <h2>Offers Paytm, Mobikwik, & More+</h2>
                          </div>
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            Netbanking
                            <h2>All Indian Banks</h2>
                          </div>
                          <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                            Cash on Delivery{" "}
                            <h2>
                              Pay online to avoid cash handling charges (₹50 per
                              product)
                            </h2>
                          </div>
                        </div>
                        <div className="payment-banner w-3/5 max-md:w-full flex gap-2">
                          <h1 className="font-semibold text-lg flex justify-center">
                            100% Secured By PAYTM
                          </h1>
                        </div>
                      </div>
                      <div className="final-price flex flex-col max-md:w-full justify-between rounded-xl shadow-2xl border-stone-300 w-2/5 p-5 bg-white sticky top-40">
                        {/* <div className="address">Address</div> */}
                        <div className="price-details flex flex-col gap-4">
                          <div className="flex justify-between">
                            <span className="font-semibold text-xl">
                              PRICE DETAILS ({totalItems} items)
                            </span>
                          </div>
                          <hr />
                          <div className="flex justify-between">
                            <span>Total MRP (Inc. of Taxes)</span> ₹
                            {cartItems.totalPrice * 2}
                          </div>
                          <div className="flex justify-between">
                            <span>Beyoung Discount</span>₹{" "}
                            {cartItems.totalPrice}
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <div className="line-through font-light">₹49</div>
                          </div>
                          <div className="flex justify-between">
                            <span>Cart Total</span>₹ {cartItems.totalPrice}
                          </div>
                        </div>
                        <div className="total-amount">
                          <div className="flex justify-between font-bold  text-lg mt-4">
                            <span>Total Amount</span>₹ {cartItems.totalPrice}
                          </div>
                          <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                            You Saved ₹ {cartItems.totalPrice} on this order
                          </span>
                          <Button
                            className="w-full py-1 my-2 rounded-sm"
                            gradientMonochrome="success"
                          >
                            <span
                              className="text-xl"
                              onClick={finalCartCheckout}
                            >
                              CHECKOUT SECURELY
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                </Tabs>
              )}
            </div>
          )}
          {item.name && (
            <div className="flex flex-col gap-3 px-48 max-xl:px-8 bg-slate-100">
              <Tabs
                aria-label="Default tabs"
                style="default"
                ref={tabsRef}
                onActiveTabChange={(tab) => setActiveTab(tab)}
                className="flex justify-around mt-5"
              >
                <Tabs.Item
                  active={tabStatus.cartActive}
                  disabled={tabStatus.cartdisabled}
                  title="CART"
                  icon={HiUserCircle}
                >
                  <div className="flex max-lg:flex-col gap-6">
                    <div className="product border-stone-300 w-3/5 max-lg:w-full">
                      <div className="product flex flex-col max-md:items-center gap-4">
                        <a
                          href="#"
                          className="flex flex-col p-4 max-md:p-2 items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <img
                            className="object-cover max-md:h-48 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={item.displayImage}
                            alt="Image not found"
                          />
                          <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                              {item.name}
                            </h5>
                            <div className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                              <div className="price flex items-center gap-2 mb-1">
                                <b className="text-md">
                                  ₹ {item.price * quantity}
                                </b>
                                <b className="text-md line-through font-light text-stone-400">
                                  ₹ {item.price * quantity * 2}
                                </b>
                                <span className="text-green-500 text-md">
                                  (50% off)
                                </span>
                              </div>
                              <b className="text-md font-light text-stone-400">
                                You save ₹{" "}
                                <span className="text-green-500">
                                  {item.price * quantity}
                                </span>
                              </b>
                              <hr className="mt-4" />
                              <div className="flex justify-between items-center">
                                <div className="my-2 flex gap-2 items-center">
                                  <span className="font-bold text-stone-600">
                                    Qty:
                                  </span>
                                  <div className="item-quantity flex flex-col justify-center items-center">
                                    <IoIosArrowUp />
                                    {quantity}
                                    <IoIosArrowDown />
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <span className="font-bold text-stone-600">
                                    Size:
                                  </span>
                                  <span>{size}</span>
                                </div>
                              </div>
                              <hr />
                            </div>
                            <div className="actions flex justify-between mt-6">
                              <span className="border-r-2 px-4 border-stone-300">
                                Remove
                              </span>
                              <span className="px-4"> Move To Wishlist</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="final-price flex flex-col rounded-xl shadow-2xl border-stone-300 w-2/5  max-lg:w-full p-5 h-96 bg-white sticky top-40">
                      <div className="price-details flex flex-col gap-4 flex-shrink">
                        <div className="flex justify-between">
                          <span className="font-semibold text-xl">
                            PRICE DETAILS ({quantity} items)
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Total MRP (Inc. of Taxes)</span> ₹
                          {item.price * quantity * 2}
                        </div>
                        <div className="flex justify-between">
                          <span>Beyoung Discount</span>₹ {item.price * quantity}
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <div className="line-through font-light">₹49</div>
                        </div>
                        <div className="flex justify-between">
                          <span>Cart Total</span>₹ {item.price * quantity}
                        </div>
                      </div>
                      <div className="total-amount">
                        <div className="flex justify-between font-bold  text-lg mt-4">
                          <span>Total Amount</span>₹ {item.price * quantity}
                        </div>
                        <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                          You Saved ₹ {item.price * quantity} on this order
                        </span>
                        <Button
                          className="w-full py-1 my-2 rounded-sm"
                          gradientMonochrome="success"
                        >
                          <span className="text-xl" onClick={shippingTabChange}>
                            CHECKOUT SECURELY
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tabs.Item>
                {/* SHIPPING TAB */}
                <Tabs.Item
                  disabled={tabStatus.shippingDisabled}
                  active={tabStatus.shippingActive}
                  title="SHIPPING"
                  icon={MdDashboard}
                >
                  <div className="flex max-md:flex-col gap-6">
                    <div className="address w-3/5 max-md:w-full">
                      {!token && (
                        <div className="without-login">
                          <div className="login-check text-center flex gap-4 justify-center items-center">
                            <span>Already have an account?</span>
                            <Button
                              color="gray"
                              className="border-2 rounded-sm border-cyan-500 text-cyan-500 px-2"
                              size="xs"
                              onClick={() => navigate(`/`)}
                            >
                              Login/Signup
                            </Button>
                          </div>
                          <h1 className="flex justify-center">Or</h1>
                          <h1 className="flex justify-center mb-2">
                            Checkout as Guest
                          </h1>
                        </div>
                      )}
                      <div className="delivery-address">
                        <AddressForm
                          address={address}
                          setAddress={setAddress}
                        />
                      </div>
                    </div>
                    <div className="final-price flex flex-col justify-between rounded-xl shadow-2xl border-stone-300 w-2/5 max-md:w-full p-5 h-96 bg-white sticky top-40">
                      <div className="price-details flex flex-col gap-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-xl">
                            PRICE DETAILS ({quantity} items)
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Total MRP (Inc. of Taxes)</span> ₹
                          {item.price * quantity * 2}
                        </div>
                        <div className="flex justify-between">
                          <span>Beyoung Discount</span>₹ {item.price * quantity}
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <div className="line-through font-light">₹49</div>
                        </div>
                        <div className="flex justify-between">
                          <span>Cart Total</span>₹ {item.price * quantity}
                        </div>
                      </div>
                      <div className="total-amount">
                        <div className="flex justify-between font-bold  text-lg mt-4">
                          <span>Total Amount</span>₹ {item.price * quantity}
                        </div>
                        <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                          You Saved ₹ {item.price * quantity} on this order
                        </span>
                        <Button
                          className="w-full py-1 my-2 rounded-sm"
                          gradientMonochrome="success"
                        >
                          <span className="text-xl" onClick={paymentTabChange}>
                            CHECKOUT SECURELY
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item
                  disabled={tabStatus.paymentDisabled}
                  active={tabStatus.paymentActive}
                  title="PAYMENT"
                  icon={MdDashboard}
                >
                  <div className="flex max-md:flex-col gap-6">
                    <div className="payment w-3/5 flex max-md:flex-col gap-4 max-md:w-full">
                      <div className="pay-options w-2/5 max-md:w-full flex flex-col gap-2">
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          Pay With Paytm
                        </div>
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          Debit/Credit Card
                        </div>
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          UPI
                          <h2>google Pay, Phone Pay, & More+</h2>
                        </div>
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          Wallets
                          <h2>Offers Paytm, Mobikwik, & More+</h2>
                        </div>
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          Netbanking
                          <h2>All Indian Banks</h2>
                        </div>
                        <div className="font-bold p-4 bg-stone-200 hover:bg-stone-300">
                          Cash on Delivery{" "}
                          <h2>
                            Pay online to avoid cash handling charges (₹50 per
                            Product )
                          </h2>
                        </div>
                      </div>
                      <div className="payment-banner w-3/5 max-md:w-full flex gap-2">
                        <h1 className="font-semibold text-lg flex justify-center">
                          100% Secured By PAYTM
                        </h1>
                      </div>
                    </div>
                    <div className="final-price flex flex-col max-md:w-full justify-between rounded-xl shadow-2xl border-stone-300 w-2/5 p-5 bg-white sticky top-40">
                      {/* <div className="address">Address</div> */}
                      <div className="price-details flex flex-col gap-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-xl">
                            PRICE DETAILS ({totalItems} items)
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Total MRP (Inc. of Taxes)</span> ₹
                          {item.price * quantity * 2}
                        </div>
                        <div className="flex justify-between">
                          <span>Beyoung Discount</span>₹ {item.price * quantity}
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <div className="line-through font-light">₹49</div>
                        </div>
                        <div className="flex justify-between">
                          <span>Cart Total</span>₹ {item.price * quantity}
                        </div>
                      </div>
                      <div className="total-amount">
                        <div className="flex justify-between font-bold  text-lg mt-4">
                          <span>Total Amount</span>₹ {item.price * quantity}
                        </div>
                        <span className="bg-blue-700 text-white flex justify-center py-1 my-2 rounded-sm">
                          You Saved ₹ {item.price * quantity} on this order
                        </span>
                        <Button
                          className="w-full py-1 my-2 rounded-sm"
                          gradientMonochrome="success"
                        >
                          <span className="text-xl" onClick={finalBuyCheckout}>
                            CHECKOUT SECURELY
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Checkout;
