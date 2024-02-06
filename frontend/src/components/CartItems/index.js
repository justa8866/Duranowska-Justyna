import React, { Component } from "react";
import { NumericFormat } from "react-number-format";

import AttributeSelector from "../AttributeSelector";

import {
  Arrow,
  Brand,
  ImageContainer,
  InfinityRow,
  LeftColumn,
  Name,
  Number,
  Price,
  RightColumn,
  Sign,
  Space,
  ThirdColumn,
} from "./CartItems.style";

class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexOfPhotos: [],
    };
  }

  setSelectedAttributeValues = (name, value, index) => {
    const cartItems = [...this.props.cartItems];

    const findAttributeIndex = cartItems[index].attributes.findIndex(
      (attribute) => attribute.name === name
    );

    if (findAttributeIndex > -1) {
      cartItems[index].attributes[findAttributeIndex].value = value;
    } else {
      cartItems[index].attributes.push({ name, value });
    }

    this.setCartItems(cartItems);
  };

  setSelectedPhotoIndex = (itemIndex, sign) => {
    const cartItems = [...this.props.cartItems];

    if (sign === "+") {
      cartItems[itemIndex].selectedPhoto += 1;
    } else {
      cartItems[itemIndex].selectedPhoto -= 1;
    }

    if (
      cartItems[itemIndex].selectedPhoto >=
      cartItems[itemIndex].product.gallery.length
    ) {
      cartItems[itemIndex].selectedPhoto = 0;
    }

    if (cartItems[itemIndex].selectedPhoto < 0) {
      cartItems[itemIndex].selectedPhoto =
        cartItems[itemIndex].product.gallery.length - 1;
    }

    this.setCartItems(cartItems);
  };

  setCartItems(cartItems) {
    this.props.onChangeCartItem(cartItems);
  }

  changeItemQuantity = (index, quantity, sign) => {
    const cartItems = [...this.props.cartItems];

    if (sign === "+") {
      cartItems[index].quantity += quantity;
    } else {
      cartItems[index].quantity -= quantity;
    }

    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }

    this.setCartItems(cartItems);
  };

  generateCart() {
    return this.props.cartItems.map((item, index) => {
      return (
        <InfinityRow key={index} small={this.props.small}>
          <LeftColumn>
            <Name small={this.props.small}>{item.product.name}</Name>
            <Brand small={this.props.small}>{item.product.brand}</Brand>
            <Price small={this.props.small}>
              <NumericFormat
                value={this.getPrice(item.product)}
                fixedDecimalScale
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={this.props.ActiveCurrency.symbol}
              />
            </Price>
            {item.product.attributes
              ? item.product.attributes.map((attribute, attrIndex) => (
                  <AttributeSelector
                    disableSelector
                    small={this.props.small}
                    key={attrIndex}
                    attribute={attribute}
                    defaultAttribute={item.attributes.find(
                      (attr) => attr.name === attribute.name
                    )}
                    setSelectedAttributeValues={(name, value) =>
                      this.setSelectedAttributeValues(name, value, index)
                    }
                  />
                ))
              : ""}
          </LeftColumn>
          <ThirdColumn small={this.props.small}>
            <Sign
              small={this.props.small}
              onClick={() => this.changeItemQuantity(index, 1, "+")}
            >
              {"+"}
            </Sign>
            <Number small={this.props.small}>{item.quantity}</Number>
            <Sign
              small={this.props.small}
              onClick={() => this.changeItemQuantity(index, 1, "-")}
            >
              {"-"}
            </Sign>
          </ThirdColumn>
          <RightColumn>
            <ImageContainer
              small={this.props.small}
              image={item.product.gallery[item.selectedPhoto]}
            >
              {this.props.disableArrows || item.product.gallery.length <= 1 ?  (
                ""
              ) : (
                <Space>
                  <Arrow onClick={() => this.setSelectedPhotoIndex(index, "-")}>
                    {"<"}
                  </Arrow>
                  <Arrow onClick={() => this.setSelectedPhotoIndex(index, "+")}>
                    {">"}
                  </Arrow>
                </Space>
              )}
            </ImageContainer>
          </RightColumn>
        </InfinityRow>
      );
    });
  }

  getPrice(product) {
    if (!product.prices) {
      return 0;
    }
    const price = product.prices.find(
      (price) => price.currency.label === this.props.ActiveCurrency.label
    );

    if (!price) {
      return 0;
    }

    return price.amount;
  }

  render() {
    return <>{this.generateCart()}</>;
  }
}

export default CartItems;
