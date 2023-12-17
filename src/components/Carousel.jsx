import React, { useEffect, useState } from "react";
import Button from "./Button";

const Carousel = ({ products }) => {
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    updateImage();
  }, [products, position]);

  const updateImage = () => {
    const updatedImages = products.map((product) => {
      return product.displayImage;
    });

    setImages(updatedImages);
  };

  return (
    <div className="flex gap-4 mb-36 items-center relative">
      {images?.length > 0 && (
        <div className="slider flex items-center gap-4 relative">
          <Button
            classes="absolute "
            onClick={() => setPosition((prev) => (prev - 1) % 4)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zm1.289-15.7 1.422 1.4-4.3 4.344 4.289 4.245-1.4 1.422-5.714-5.648z" />
            </svg>
          </Button>
          <img
            className="rounded-lg w-72 h-72"
            src={images[position % 4]}
            alt="No image for now"  
          />
          <img
            className="rounded-lg w-72 h-72"
            src={images[(position + 1) % 4]}
            alt="No image for now"
          />
          <img
            className="rounded-lg w-72 h-72"
            src={images[(position + 2) % 4]}
            alt="No image for now"
          />
          <img
            className="rounded-lg w-72 h-72"
            src={images[(position + 3) % 4]}
            alt="No image for now"
          />
          <Button
            classes="absolute right-0 text-white bg-gradient-to-r from-yellow-500 to-yellow-100 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setPosition((prev) => (prev + 1) % 4)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
