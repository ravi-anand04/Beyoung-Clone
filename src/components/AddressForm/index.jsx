import React, { useState } from "react";

const AddressForm = ({ address, setAddress }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-stone-700 mb-4">
        Delivery Address
      </h1>
      <div className="address flex flex-col gap-4 ">
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="First Name"
            value={address.fname}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, fname: e.target.value };
              })
            }
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Last Name"
            value={address.lname}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, lname: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Email"
            value={address.email}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Phone No."
            value={address.phone}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, phone: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, street: e.target.value };
              })
            }
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, city: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className={`border-1 w-full rounded-md ${
              !address.state ? "border-red-600" : "border-stone-300"
            } font-light`}
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, state: e.target.value };
              })
            }
          />
          <input
            className={`border-1 w-full rounded-md ${
              !address.country ? "border-red-600" : "border-stone-300"
            } font-light`}
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, country: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between m-auto">
          <input
            className={`w-full ${
              !address.zipCode ? "border-red-600" : "border-stone-300"
            } rounded-md  font-light`}
            type="text"
            placeholder="Zipcode"
            value={address.zipCode}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, zipCode: e.target.value };
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
