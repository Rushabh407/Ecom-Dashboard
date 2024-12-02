import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const PrivateComponent = () => {
  const user = localStorage.getItem("user");

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to={"/signup"} />
      )}
    </>
  );
};

export default PrivateComponent;
