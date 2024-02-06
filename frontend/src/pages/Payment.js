import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Auth";
import { auth } from "../common/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Ofp6nBfnAA6oPPm24KtO1quaHWzz7dxO3LsIGgcbLWd7Ya2zRz26OSDDS9hPiMX6KtoL2FjSI2y0y8yTJUMRKAt00sCQa3vgL');

class Payment extends Component {
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
          <Elements stripe={stripePromise}>
            <PaymentForm
              onPaymentSuccess={() => console.log("Payment successful!")}
            />
          </Elements>
        ) : (
          <Login />
        )}
      </>
    );
  }
}

export default Payment;