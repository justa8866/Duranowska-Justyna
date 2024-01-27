import React, { Component } from "react";
import ProductsList from "../components/ProductsList";
import Navbar from "../components/Navbar";
import { Overlay } from "./overlay.style";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveCurrency: {},
      ActiveCategory: "",
      cartItemsCount: 0,
      CardListBackdropFilter: false,
      DropDownVisibility: false,
    };
  }

  componentDidMount() {
    this.getCartItemsCount();
  }

  onViewCardListBackdropFilter = (boolean) => {
    this.setState({ CardListBackdropFilter: boolean });
  };

  onChangeDropDownVisibility = (boolean) => {
    this.setState({ DropDownVisibility: boolean });
  };

  onChangeActiveCurrency = (currency) => {
    this.setState({ ActiveCurrency: currency });
  };

  onChangeCategory = (category) => {
    this.setState({ ActiveCategory: category });
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

  onChangeCartItem = () => {
    this.getCartItemsCount();
  };

  render() {
    return (
      <>
        <Navbar
          client={this.props.client}
          onChangeActiveCurrency={this.onChangeActiveCurrency}
          onChangeCategory={this.onChangeCategory}
          cartItemsCount={this.state.cartItemsCount}
          onChangeCartItem={this.onChangeCartItem}
          onViewCardListBackdropFilter={this.onViewCardListBackdropFilter}
          onChangeDropDownVisibility={this.onChangeDropDownVisibility}
          DropDownVisibility={this.state.DropDownVisibility}
        />
        <Overlay
          onClick={() => {
            this.onViewCardListBackdropFilter(false);
            this.onChangeDropDownVisibility(false);
          }}
          CardListBackdropFilter={this.state.CardListBackdropFilter}
        >
          <ProductsList
            client={this.props.client}
            ActiveCurrency={this.state.ActiveCurrency}
            ActiveCategory={this.state.ActiveCategory}
            onChangeCartItem={this.onChangeCartItem}
          />
        </Overlay>
      </>
    );
  }
}

export default Products;
