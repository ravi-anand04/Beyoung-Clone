import { Button, Card, Tabs } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useFetch from "../../Hooks/useFetch";
import { CART_ACTION } from "../../constants";
import AddressForm from "../../components/AddressForm";

const Checkout = () => {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const { data, loading, error } = useFetch(CART_ACTION);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div>
      <div className="flex flex-col gap-3 px-48">
        <Tabs
          aria-label="Default tabs"
          style="default"
          ref={tabsRef}
          onActiveTabChange={(tab) => setActiveTab(tab)}
          className="flex justify-around mt-5"
        >
          <Tabs.Item active title="CART" icon={HiUserCircle}>
            <div className="flex gap-6">
              <div className="products border-2 border-stone-300 w-3/5">
                <div className="product">
                  <Card
                    className="max-w-sm m-auto my-2 rounded-xl"
                    imgSrc="../../assets/images/jeremy-liem-z2yCj8ZB9n0-unsplash.jpg"
                    horizontal
                  >
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Sand Brown Solid Urban Shirt for Men
                    </h5>
                    <div className="category text-md font-light mb-2">
                      <p>
                        product.subCategory &&
                        product.subCategory.charAt(0).toUpperCase() +
                        product.subCategory.slice(1)
                      </p>
                    </div>
                    <div className="price flex items-center gap-3 mb-1">
                      <b className="text-lg">₹ product.price</b>
                      <b className="text-xl line-through font-light text-stone-400">
                        ₹ product.price * 2
                      </b>
                      <span className="text-green-500 font-semibold text-lg">
                        (50% off)
                      </span>
                    </div>
                    <div className="product-details">
                      <hr className="h-0.5" />
                      <div className="flex justify-around">
                        <div className="size">
                          {" "}
                          <span className="font-semibold">Color</span> : Sand
                          Brown
                        </div>
                        <div className="size">
                          {" "}
                          <span className="font-semibold">Size</span> : L
                        </div>
                      </div>
                      <hr className="h-0.5" />
                    </div>
                    <div className="quantity"></div>
                    <div className="product-details flex justify-evenly">
                      <div className="">Remove</div>
                      <div className="border-black-900 border-r-2"></div>
                      <div>Move to Wishlist</div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="final-price border-2 border-stone-300 w-2/5 p-5">
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
          <Tabs.Item title="SHIPPING" icon={MdDashboard}>
            <div className="flex gap-6">
              <div className="address border-2 border-stone-300 w-3/5">
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
              <div className="final-price border-2 border-stone-300 w-2/5 p-5">
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
