import React from "react";
import { Toaster } from "react-hot-toast";
import Home from "../components/Home";


const Main = async () => {


  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: { backgroundColor: "black", color: "white" },
        }}
      />

      <Home />
    </>
  );
};

export default Main;
