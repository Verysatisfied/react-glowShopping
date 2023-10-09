import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
// import styled from "styled-components";

import {
  Home,
  About,
  Cart,
  CheckoutPage,
  AuthWrapper,
  ErrorPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
