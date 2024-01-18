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
  const [hasMore, setHasMore] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    size: [],
  });

  const [clear, setClear] = useState(false);

  useEffect(() => {
    searchProducts();
  }, [page, selectedFilters]);

  useEffect(() => {}, [products]);

  const searchProducts = async () => {
    const userFilters = removeFalsyValues(selectedFilters);
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&filter=${JSON.stringify(
      userFilters
    )}&limit=5&page=${page}`;
    const res = await fetch(url, { method: "GET", headers });

    const resJSON = await res.json();

    if (resJSON.status == "fail") {
      setProducts([]);
      setLoader(false);
      return;
    }

    setHasMore(true);

    const updatedProducts = [...products, ...resJSON.data];
    setProducts(updatedProducts);
    setLoader(false);
  };

  function removeFalsyValues(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        return Boolean(value) && !(Array.isArray(value) && value.length === 0);
      })
    );
  }

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const filterProducts = async (type, value) => {
    setClear(true);
    const updatedFilters = {
      ...selectedFilters,
      [type]: selectedFilters[type].find(
        (filter) => filter === value.toUpperCase()
      )
        ? [...selectedFilters[type]]
        : [...selectedFilters[type], value.toUpperCase()],
    };

    console.log("Updated ------------", updatedFilters);

    setSelectedFilters(updatedFilters);
    setPage(1);

    const userFilters = removeFalsyValues(updatedFilters);

    console.log("USER", userFilters);

    const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&filter=${JSON.stringify(
      userFilters
    )}&limit=5&page=1`;

    const res = await fetch(url, { method: "GET", headers });
    const resJSON = await res.json();

    if (resJSON.status == "fail") {
      setProducts([]);
      return;
    }

    console.log("Filtered", resJSON.data);

    const updatedProducts = [...resJSON.data];

    setProducts(updatedProducts);
    setLoader(false);
  };

  const sortProducts = (order) => {
    if (order == "low") {
      const compareFn = (b, a) => b.price - a.price;
      const sortedProducts = products.sort(compareFn);
      setProducts((prev) => sortedProducts);
    } else {
      const compareFn = (b, a) => a.price - b.price;
      const sortedProducts = products.sort(compareFn);
      setProducts((prev) => sortedProducts);
    }
  };

  const clearFilter = () => {
    setSelectedFilters({ color: [], size: [] });
    setClear(false);
  };

  return (
    <div className="xl:px-36 px-12">
      {!products.length ? (
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl text-stone-600">No matching products!</h1>
          <ProductNotFound />
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-2xl my-5">FILTERS</h1>
          <div className="flex gap-4 main max-md:flex-col">
            <div className="filters w-1/4 max-lg:w-1/2 max-md:w-full ">
              <div className="selected-filters mb-4 flex flex-col gap-4 flex-wrap">
                <div className="filtered-colors flex flex-wrap gap-2">
                  {selectedFilters.color.map((color) => (
                    <Button size="sm" color={color && color.toLowerCase()} pill>
                      {color}
                    </Button>
                  ))}
                </div>
                <div className="filtered-sizes flex flex-wrap gap-2">
                  {selectedFilters.size.map((size) => (
                    <Button size="sm" color="dark" pill>
                      {size}
                    </Button>
                  ))}
                </div>

                {clear && (
                  <Button
                    size="sm"
                    gradientMonochrome="failure"
                    pill
                    className="w-1/3"
                    onClick={clearFilter}
                  >
                    Clear filter
                  </Button>
                )}
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
                      <Button
                        size="sm"
                        color="dark"
                        onClick={() => sortProducts("low")}
                      >
                        Price : Low to High
                      </Button>
                      <Button
                        size="sm"
                        color="dark"
                        onClick={() => sortProducts("high")}
                      >
                        Price : High to Low
                      </Button>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>

            <div className="products w-3/4 mb-12 max-md:w-full">
              {loader && <Loader />}
              <InfiniteScroll
                dataLength={products.length} //This is important field to render the next data
                next={fetchNextPage}
                hasMore={hasMore}
                loader={Loader}
                endMessage={
                  <h1 style={{ textAlign: "center" }}>
                    <b className="text-lg bg-stone-300 p-4 rounded-lg">
                      Yay! You have seen it all
                    </b>
                  </h1>
                }
                scrollableTarget="scrollableDiv"
                className="flex justify-center flex-wrap gap-4 items-center"
              >
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
