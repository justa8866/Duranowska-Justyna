import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItems from "../CartItems";
import { NumericFormat } from "react-number-format";
import { CustomScrollbar } from "../CustomScrollbar";

import {
  Trolley,
  DropdownMenu,
  Badge,
  Items,
  MyBag,
  ButtonContainer,
  Button,
  GreenButton,
  Container,
  TextContainer,
  Left,
  Right,
} from "./CartDropdown.style";
import trolley from "./trolley.png";

class CartDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      cartItemsCount: 0,
    };
  }

  getCart = () => {
    const cart = [];
    const cartStorage = localStorage.getItem("cart");

    if (cartStorage) {
      JSON.parse(cartStorage).map((item) =>
        cart.push({ selectedPhoto: 0, ...item })
      );
    }

    this.setState({ cartItems: cart });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      cartItemsCount: parseInt(props.cartItemsCount, 10) || 0,
    };
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

  getTotalPrice() {
    let sum = 0;
    this.state.cartItems.map(
      (item) => (sum += this.getPrice(item.product) * item.quantity)
    );
    return sum;
  }

  onChangeCartItem = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.setState({ cartItems });
    this.props.onChangeCartItem();
  };

  enableDropdown = () => {
    this.getCart();
    this.props.onViewCardListBackdropFilter(true);
    this.props.onChangeDropDownVisibility(true);
  };

  render() {
    return (
      <div
        style={{ display: "block", position: "relative" }}
        onMouseEnter={() =>
          this.props.disableDropDown ? null : this.enableDropdown()
        }
      >
        <Trolley src={trolley} />
        {this.state.cartItemsCount > 0 ? (
          <Badge>{this.state.cartItemsCount}</Badge>
        ) : (
          ""
        )}
        <DropdownMenu toggleOn={this.props.DropDownVisibility}>
          <Container>
            <Items>
              <MyBag>My Bag,&nbsp;</MyBag> {this.state.cartItemsCount}{" "}
              {this.state.cartItemsCount === 1 ? "item" : "items"}
            </Items>

            <CustomScrollbar>
              <CartItems
                cartItems={this.state.cartItems}
                ActiveCurrency={this.props.ActiveCurrency}
                onChangeCartItem={this.onChangeCartItem}
                disableArrows
                small
              />
            </CustomScrollbar>

            <TextContainer>
              <Left>Total</Left>
              <Right>
                <NumericFormat
                  value={this.getTotalPrice()}
                  fixedDecimalScale
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={this.props.ActiveCurrency.symbol}
                />
              </Right>
            </TextContainer>

            <ButtonContainer>
              <Link to="/cart">
                <Button>View bag</Button>
              </Link>
              <Link to="/order">
              <GreenButton>Check out</GreenButton>
              </Link>
            </ButtonContainer>
          </Container>
        </DropdownMenu>
      </div>
    );
  }
}

export default CartDropdown;
