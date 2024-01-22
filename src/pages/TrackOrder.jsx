import React, { useEffect, useState } from "react";
import { ADD_TO_ORDER } from "../constants";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
      Authorization: `Bearer ${localStorage.getItem("beyoung_token")}`,
    };

    const res = await fetch(ADD_TO_ORDER, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    setOrders(resJSON.data);
    console.log("Order", resJSON);
  };

  const convertDate = (inputDate) => {
    const parsedDate = new Date(inputDate);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <div className="px-48 max-xl:px-12 max-sm:px-1 mt-12">
      <div className="flex flex-wrap justify-center">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.createdAt}
              className="mx-2 mb-4 bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4 w-[500px] max-lg:w-[400px]">
                <div className="font-bold text-xl mb-2">
                  {order.order.items[0].product.name}
                </div>
                <p className="text-gray-700 mt-4">
                  <b>Total Price:</b> {order.order.items[0].product.price}
                </p>
                <p className="text-gray-700 mt-2">
                  <b>Order ID:</b> {order.order.items[0].product._id}
                </p>
                <p className="text-gray-700 mt-2">
                  <b>Order Date:</b> {convertDate(order.createdAt)}
                </p>
                <div className="flex gap-8 mt-4">
                  <img
                    src={order.order.items[0].product.displayImage}
                    className="rounded-lg w-[100px]"
                    alt=""
                  />
                  <div className="address">
                    <h1 className="text-xl font-bold mt-4">Address:</h1>
                    <p className="text-gray-700 flex justify-left flex-wrap gap-4 mt-4">
                      <div className="address-portion">
                        <b>Street: </b>{" "}
                        {order.order.shipmentDetails.address.street}
                      </div>
                      <div className="address-portion">
                        <b>City: </b>
                        {order.order.shipmentDetails.address.city}
                      </div>
                      <div className="address-portion">
                        <b>Pincode: </b>
                        {order.order.shipmentDetails.address.zipCode}
                      </div>
                      <div className="address-portion">
                        <b>Country: </b>
                        {order.order.shipmentDetails.address.country}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="m-auto mt-16">
            <h1 className=" text-3xl font-bold mb-8">No orders found.</h1>
            <Button
              size="sm"
              color="dark"
              className="m-auto"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
