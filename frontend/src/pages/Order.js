import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Auth";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveCurrency: {},
      ActiveCategory: "",
      cartItemsCount: 0,
    };
  }

  componentDidMount() {
    this.getCartItemsCount();
  }

  getCartItemsCount() {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const temp = JSON.parse(cart);

      if (temp) {
        if (temp.length) {
          let count = 0;
          temp.map((item) => (count += item.quantity));

          this.setState({ cartItemsCount: count || 0 });
          return;
        }
      }
    }

    this.setState({ cartItemsCount: 0 });
  }

  onChangeActiveCurrency = (currency) => {
    this.setState({ ActiveCurrency: currency });
  };

  onChangeCategory = (category) => {
    this.setState({ ActiveCategory: category });
  };

  onChangeCartItem = () => {
    this.getCartItemsCount();
  };

  render() {
    return (
      <>
        <Navbar
          client={this.props.client}
          cartItemsCount={this.state.cartItemsCount}
          onChangeActiveCurrency={this.onChangeActiveCurrency}
          onChangeCategory={this.onChangeCategory}
          onChangeCartItem={this.onChangeCartItem}
          disableDropDown
        />
        <Login />
      </>
    );
  }
}

export default Order;
