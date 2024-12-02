import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SignUpPage from "../components/SignUpPage";
import PrivateComponent from "../components/PrivateComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../components/Login";
import AddProduct from "../components/AddProduct";
import Products from "../components/Products";
import UpdateProduct from "../components/UpdateProduct";
import HomePage from "../components/HomePage";
import Profile from "../components/Profile";
import Password from "../components/Password";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotPrivateComponent from "../components/NotPrivateComponent";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateComponent />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
      </Route>
      <Route element={<NotPrivateComponent/>}>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </>
  )
);
