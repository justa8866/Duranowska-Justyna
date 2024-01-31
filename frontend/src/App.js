import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products client={this.props.client} />} />
            <Route
              path="products/:category"
              element={<Products client={this.props.client} />}
            />
            <Route
              path="product/:productId"
              element={<Product client={this.props.client} />}
            />
            <Route path="cart" element={<Cart client={this.props.client} />} />
            <Route path="order" element={<Order client={this.props.client} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
