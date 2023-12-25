import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SEARCH_PRODUCTS } from "../constants";
import { Accordion, Button } from "flowbite-react";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import { headers } from "../constants";
import ProductNotFound from "../components/ProductNotFound";

const Search = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    size: [],
  });

  useEffect(() => {
    searchProducts();
  }, [page]);

  const searchProducts = async () => {
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&limit=5&page=${page}`;
    const res = await fetch(url, { method: "GET", headers });

    if (res.status == "fail") {
      return;
    }

    const resJSON = await res.json();

    const updatedProducts = [...products, ...resJSON.data];
    setProducts(updatedProducts);
    setLoader(false);
  };

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  // const filterProducts = async (type, value) => {
  //   const updatedFilters = {
  //     ...selectedFilters,
  //     [type]: [value.toUpperCase()],
  //   };

  //   console.log("Updated ------------", updatedFilters);

  //   setSelectedFilters(updatedFilters);
  //   setPage(1);

  //   const nonEmptyParams = {};

  //   if (updatedFilters.size.length) {
  //     nonEmptyParams.size = updatedFilters.size;
  //   }

  //   if (updatedFilters.color.length) {
  //     nonEmptyParams.color = updatedFilters.color;
  //   }

  //   console.log(nonEmptyParams);

  //   const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&filter=${JSON.stringify(
  //     nonEmptyParams
  //   )}&limit=5&page=1`;
  //   // console.log("jsondata", JSON.stringify(updatedFilters));
  //   const res = await fetch(url, { method: "GET", headers });

  //   if (res.status == "fail") {
  //     setProducts([]);
  //     return;
  //   }

  //   const resJSON = await res.json();

  //   console.log("Filtered", resJSON);

  //   const updatedProducts = [...resJSON.data];
  //   setProducts(updatedProducts);
  //   setLoader(false);
  // };

  return (
    <div className="lg:px-36 px-12 ">
      <h1 className="font-bold text-2xl my-5">FILTERS</h1>
      <div className="flex gap-4 main">
        <div className="filters w-1/4 max-lg:w-1/2 ">
          <div className="selected-filters mb-4 flex gap-4 flex-wrap">
            <div className="filtered-colors ">
              {selectedFilters.color[0] && (
                <Button
                  size="sm"
                  color={
                    selectedFilters.color[0] &&
                    selectedFilters.color[0].toLowerCase()
                  }
                  pill
                >
                  {selectedFilters.color[0]}
                </Button>
              )}
            </div>
            {selectedFilters.size.map((value) => (
              <Button size="sm" color="dark" pill>
                {value}
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
          {loader && <Loader />}
          {/* {<ProductNotFound />} */}
          <InfiniteScroll
            dataLength={products.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={true}
            loader={Loader}
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
