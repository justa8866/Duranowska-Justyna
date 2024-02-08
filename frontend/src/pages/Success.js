import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Auth";
import { auth } from "../common/firebase";
import { onAuthStateChanged } from "firebase/auth";

class Success extends Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem("user");
    this.state = {
      ActiveCurrency: {},
      ActiveCategory: "",
      cartItemsCount: 0,
      isAuth: user ? true : false,
    };
  }

  componentDidMount() {
    localStorage.removeItem("cart");
    this.getCartItemsCount();
    this.unsubscribe = onAuthStateChanged(auth, this.onAuthStateChanged);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAuthStateChanged = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({ isAuth: true });
    } else {
      localStorage.removeItem("user");
      this.setState({ isAuth: false });
    }
  };

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
        {this.state.isAuth ? (
                  <div>
                  <h2>Thank you for your payment!</h2>
                  <p>Your payment has been successfully processed.</p>
                  <p>You will receive an email with the details of your order.</p>
                  <p>Your order will be delivered within 7 days to the provided address.</p>
                  <p>Thank you for shopping with us!</p>
                </div>

        ) : (
          <Login />
        )}
      </>
    );
  }
}

export default Success;
