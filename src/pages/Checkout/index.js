import { Button, Card, Tabs } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { CART_ACTION } from "../../constants";
import AddressForm from "../../components/AddressForm";

const Checkout = () => {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    // console.log("Token", `${localStorage.getItem("beyoung_token")}`);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
      projectID: process.env.PROJECT_ID,
    };

    const res = await fetch(CART_ACTION, { method: "GET", headers });

    const resJSON = await res.json();
    console.log("cart data", resJSON);
    setCartItems(resJSON.data);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 px-48 max-xl:px-8">
        <Tabs
          aria-label="Default tabs"
          style="default"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveTab(tab)}
          className="flex justify-around mt-5"
        >
          <Tabs.Item active title="CART" icon={HiUserCircle}>
            <div className="flex gap-6">
              <div className="product border-stone-300 w-3/5">
                <div className="product flex flex-col gap-4">
                  {cartItems.items &&
                    cartItems.items.map((item) => (
                      <a
                        href="#"
                        className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <img
                          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                          src={item.product.displayImage}
                          alt="Image not found"
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.product.name}
                          </h5>
                          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                            <div className="price flex items-center gap-2 mb-1">
                              <b className="text-md">₹ {item.product.price}</b>
                              <b className="text-md line-through font-light text-stone-400">
                                ₹ {item.product.price * 2}
                              </b>
                              <span className="text-green-500 text-md">
                                (50% off)
                              </span>
                            </div>
                            <b className="text-md font-light text-stone-400">
                              You save ₹{" "}
                              <span className="text-green-500">
                                {item.product.price}
                              </span>
                            </b>
                            <hr />
                            <div className="flex justify-between items-center">
                              <div className="my-2 flex gap-2 items-center">
                                <span className="font-bold text-stone-600">
                                  Qty:
                                </span>
                                <select
                                  onChange={(e) =>
                                    setQuantity(parseInt(e.target.value))
                                  }
                                  className="h-10"
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-bold text-stone-600">
                                  Size:
                                </span>
                                <span>{item.size}</span>
                              </div>
                            </div>
                            <hr />
                          </p>
                          <div className="actions flex justify-between mt-6">
                            <span className="border-r-2 px-4 border-stone-300">
                              Remove
                            </span>
                            <span className="px-4"> Move To Wishlist</span>
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
              <div className="final-price flex flex-col justify-between border-stone-300 w-2/5 p-5">
                <div className="price-details flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h1>PRICE DETAILS ({2} items)</h1>
                  </div>
                  <div className="flex justify-between">
                    <span>Total MRP (Inc. of Taxes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beyoung Discount</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cart Total</span>
                  </div>
                </div>
                <div className="total-amount">
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                  </div>
                  <div>
                    <span>You Saved ₹2599 on this order</span>
                  </div>
                  <Button>CHECKOUT SECURELY</Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="SHIPPING" icon={MdDashboard}>
            <div className="flex gap-6">
              <div className="address w-3/5">
                <div className="login-check text-center mt-6 flex gap-4 justify-center items-center">
                  <span>Already have an account?</span>
                  <Button
                    color="gray"
                    className="border-2 rounded-sm border-cyan-500 text-cyan-500 px-2"
                    size="xs"
                  >
                    Login/Signup
                  </Button>
                </div>
                <h1 className="flex justify-center">Or</h1>
                <h1 className="flex justify-center mb-2">Checkout as Guest</h1>
                <div className="delivery-address">
                  <AddressForm />
                </div>
              </div>
              <div className="final-price w-2/5 p-5">
                <div className="price-details">
                  <div className="flex justify-between">
                    <h1>PRICE DETAILS ({2} items)</h1>
                  </div>
                  <div className="flex justify-between">
                    <span>Total MRP (Inc. of Taxes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beyoung Discount</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cart Total</span>
                  </div>
                </div>
                <div className="total-amount">
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                  </div>
                  <div>
                    <span>You Saved ₹2599 on this order</span>
                  </div>
                  <Button>CHECKOUT SECURELY</Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item disabled={true} title="PAYMENT" icon={MdDashboard}>
            Disabled content
          </Tabs.Item>
        </Tabs>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active tab: {activeTab}
        </div>
        <Button.Group>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(0)}>
            Profile
          </Button>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(1)}>
            Dashboard
          </Button>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(2)}>
            Settings
          </Button>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(3)}>
            Contacts
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};

export default Checkout;
