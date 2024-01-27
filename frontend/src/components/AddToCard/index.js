import React, { Component } from "react";
import { ButtonAddToCart } from "./AddToCard";
import { addToCart } from "../../common/utils";

export default class AddToCard extends Component {
  addToCartAndNotify = () => {
    addToCart(this.props.product, this.props.selectedAttributes, 1);
    this.props.onChangeCartItem();
  };

  render() {
    return (
      <>
        {this.props.product.inStock ? (
          <ButtonAddToCart
            onClick={this.addToCartAndNotify}
          >
            ADD TO CART
          </ButtonAddToCart>
        ) : null}
      </>
    );
  }
}
