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

  useEffect(() => {
    searchProducts();
  }, [page]);

  const searchProducts = async () => {
    const headers = {
      "Content-Type": "application/json",
      projectId: process.env.PROJECT_ID,
    };
    const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${query}"}&limit=5&page=${page}`;
    const res = await fetch(url, { method: "GET", headers });

    // if (res.status != "fail") {
    const resJSON = await res.json();

    const updatedProducts = [...products, ...resJSON.data];
    //   console.log("Is it actually updated", updatedProducts);
    setProducts(updatedProducts);
    // } else {
    // setError(true);
    // }
  };

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="md:px-36 px-12">
      <h1 className="font-bold text-2xl my-5">FILTERS</h1>
      <div className="flex gap-4 main">
        <div className="filters w-1/4 max-lg:w-1/2">
          <div className="selected-filters mb-4">Selected</div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>COLOR</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" color="blue" pill>
                    Blue
                  </Button>
                  <Button size="sm" color="warning" pill>
                    Yellow
                  </Button>
                  <Button size="sm" color="success" pill>
                    Green
                  </Button>
                  <Button size="sm" color="dark" pill>
                    Black
                  </Button>
                  <Button size="sm" color="purple" pill>
                    Purple
                  </Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>SIZE</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" color="dark" pill>
                    S
                  </Button>
                  <Button size="sm" color="dark" pill>
                    M
                  </Button>
                  <Button size="sm" color="dark" pill>
                    L
                  </Button>
                  <Button size="sm" color="dark" pill>
                    XL
                  </Button>
                  <Button size="sm" color="dark" pill>
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
            className="flex justify-center flex-wrap gap-2"
          >
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Search;
