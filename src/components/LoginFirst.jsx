import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginFirst = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-bold flex justify-center items-center mt-[100px] ">
        You are not logged in !
      </h1>
      <Button
        color="gray"
        className="border-2 rounded-sm border-cyan-500 text-cyan-500 px-2"
        size="md"
        onClick={() => navigate(`/`)}
      >
        Login/Signup
      </Button>
    </div>
  );
};

export default LoginFirst;
