import React from "react";
import { useState } from "react";
import "./app.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { CartProvider } from "./utils/CartContext";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import DynamicTitle from "./components/DynamicTitle";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { SessionProvider } from "./utils/SessionContext";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <CartProvider>
          <DynamicTitle />
          <Navbar />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/products/:productID" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </CartProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
