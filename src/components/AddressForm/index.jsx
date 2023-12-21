import { FloatingLabel, TextInput } from "flowbite-react";
import React from "react";

const AddressForm = () => {
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
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Email"
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Phone No."
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="PIN Code"
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Town/Village"
          />
        </div>
        <div className="flex justify-between gap-3">
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="City/District"
          />
          <input
            className="border-1 w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex justify-between">
          <input
            className="w-full rounded-md border-stone-300 font-light"
            type="text"
            placeholder="Address (House No., Building, Street, Area)"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
