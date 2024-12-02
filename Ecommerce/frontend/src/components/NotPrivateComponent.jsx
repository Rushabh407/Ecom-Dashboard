import React from "react";
import { Navigate , Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotPrivateComponent = () => {
    const user = localStorage.getItem("user");
  return (
    <>
      {user ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
        
      )}
    </>
  );
};

export default NotPrivateComponent;
