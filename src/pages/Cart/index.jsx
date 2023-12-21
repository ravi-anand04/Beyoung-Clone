import { Tabs } from "flowbite-react";
import React from "react";
import { HiUserCircle } from "react-icons/hi";

const Cart = () => {
  return (
    <Tabs.Item active title="CART" icon={HiUserCircle}>
      This is{" "}
      <span className="font-medium text-gray-800 dark:text-white">
        Profile tab's associated content
      </span>
      . Clicking another tab will toggle the visibility of this one for the
      next. The tab JavaScript swaps classes to control the content visibility
      and styling.
    </Tabs.Item>
  );
};

export default Cart;
