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
            placeholder="PIN Code"
            value={address.pin}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, pin: e.target.value };
              })
            }
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Town/Village"
            value={address.town}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, town: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="City/District"
            value={address.city}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, city: e.target.value };
              })
            }
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, state: e.target.value };
              })
            }
          />
        </div>
        <div className="flex justify-between">
          <input
            className="w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Address (House No., Building, Street, Area)"
            value={address.address}
            onChange={(e) =>
              setAddress((prev) => {
                return { ...prev, fullAddress: e.target.value };
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
