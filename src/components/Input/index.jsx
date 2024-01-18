import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = (props) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const searchHandler = () => {
    if (query) {
      navigate(`/search/${query}`);
      window.location.reload();
      props.togglesearchbar();
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-end right-40 absolute max-sm:static p-4 bg-white">
        <input
          value={query}
          onChange={(e) => changeHandler(e)}
          className="px-4 w-64"
          placeholder="Search entire store here..."
          type="text"
        />
        <Button
          onClick={searchHandler}
          className="rounded-none px-2"
          color="dark"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Input;
