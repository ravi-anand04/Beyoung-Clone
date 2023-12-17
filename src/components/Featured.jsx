import React from "react";
import { Button } from "flowbite-react";
import ProductCard from "./ProductCard";

const Featured = () => {
  return (
    <div className="px-48 flex flex-col justify-center">
      <div className="tabs flex gap-4 mt-2 mb-8">
        <Button gradientDuoTone="purpleToPink">NEW ARRIVALS</Button>
        <Button gradientDuoTone="purpleToPink">WINTER WEARS</Button>
      </div>

      <div className="conditional-items flex gap-4 flex-wrap justify-center">
        {/* {Array(10)
          .fill(0)
          .map((val, index) => (
            <ProductCard />
          ))} */}
      </div>
    </div>
  );
};

export default Featured;
