import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SEARCH_PRODUCTS } from "../constants";
import { Accordion, Button } from "flowbite-react";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

const Search = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    searchProducts();
  }, [page]);

  useEffect(() => {}, [selectedFilters]);

  const searchProducts = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
    };

    if (!selectedFilters.colors && !selectedFilters.sizes) {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&limit=5&page=${page}`;
      const res = await fetch(url, { method: "GET", headers });

      const resJSON = await res.json();

      const updatedProducts = [...products, ...resJSON.data];
      setProducts(updatedProducts);
    } else {
      const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&filter=${selectedFilters}&limit=5&page=${page}`;
      const res = await fetch(url, { method: "GET", headers });

      const resJSON = await res.json();

      const updatedProducts = [...products, ...resJSON.data];
      setProducts(updatedProducts);
    }
  };

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const filterProducts = (type, value) => {
    if (type === "color") {
      const updatedProducts = products.filter(
        (product) => product.color === value.toUpperCase()
      );
      setSelectedFilters((prev) => {
        return {
          ...prev,
          colors: [...prev.colors, value],
        };
      });
      setProducts(updatedProducts);
    } else if (type === "size") {
      const updatedProducts = products.filter((product) =>
        product.color.includes(value)
      );
      setSelectedFilters({
        ...selectedFilters,
        selectedFilters: [selectedFilters.sizes, value],
      });
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="lg:px-36 px-12">
      <h1 className="font-bold text-2xl my-5">FILTERS</h1>
      <div className="flex gap-4 main">
        <div className="filters w-1/4 max-lg:w-1/2">
          <div className="selected-filters mb-4">
            <div className="filtered-colors flex gap-4 flex-wrap">
              {selectedFilters.colors.map((color) => (
                <Button size="sm" color={color} pill>
                  {color}
                </Button>
              ))}
            </div>
            {selectedFilters.sizes.map((size) => (
              <Button size="sm" color="dark" pill>
                S
              </Button>
            ))}
          </div>
          <Accordion className="sticky top-[20%]">
            <Accordion.Panel>
              <Accordion.Title>COLOR</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => filterProducts("color", "blue")}
                    color="blue"
                    pill
                  >
                    Blue
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => filterProducts("color", "yellow")}
                    color="warning"
                    pill
                  >
                    Yellow
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => filterProducts("color", "green")}
                    color="success"
                    pill
                  >
                    Green
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => filterProducts("color", "black")}
                    color="dark"
                    pill
                  >
                    Black
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => filterProducts("color", "purple")}
                    color="purple"
                    pill
                  >
                    Purple
                  </Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>SIZE</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => filterProducts("size", "S")}
                    pill
                  >
                    S
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => filterProducts("size", "M")}
                    pill
                  >
                    M
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => filterProducts("size", "L")}
                    pill
                  >
                    L
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => filterProducts("size", "XL")}
                    pill
                  >
                    XL
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    onClick={() => filterProducts("size", "XXL")}
                    pill
                  >
                    XXL
                  </Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>PRICE</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" color="dark">
                    Price : Low to High
                  </Button>
                  <Button size="sm" color="dark">
                    Price : High to Low
                  </Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className="products w-3/4 mb-12">
          <InfiniteScroll
            dataLength={products.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            className="flex justify-center flex-wrap gap-4 items-center"
          >
            {products.length > 0 &&
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Search;
