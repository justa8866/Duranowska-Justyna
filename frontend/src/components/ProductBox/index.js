import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import {
  SingleProduct,
  ImageContainer,
  Image,
  Name,
  Price,
  OverlayImage,
  Trolley,
  Background,
  OutOfStockName,
  OutOfStockPrice,
} from "./ProductBox.style";

import trolley from "./trolley.png";

import { addToCart } from "../../common/utils";

export default class ProductBox extends Component {
  getPrice() {
    const price = this.props.product.prices.find(
      (price) => price.currency.symbol === this.props.ActiveCurrency.symbol
    );
    return price.amount;
  }

  render() {
    return (
      <SingleProduct>
        <Link to={`/product/${this.props.product.id}`}>
          <ImageContainer>
            {this.props.product.inStock === true ? (
              <Image image={this.props.product.gallery[0]}>
                <Background
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(this.props.product, [], 1);
                    this.props.onChangeCartItem();
                  }}
                >
                  <Trolley src={trolley} />
                </Background>
              </Image>
            ) : (
              <OverlayImage image={this.props.product.gallery[0]}>
                out of stock
              </OverlayImage>
            )}
          </ImageContainer>
          {this.props.product.inStock === true ? (
            <>
              <Name>
                {this.props.product.brand} {this.props.product.name}
              </Name>
              <Price>
                <NumericFormat
                  value={this.getPrice()}
                  fixedDecimalScale
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={this.props.ActiveCurrency.symbol}
                />
              </Price>
            </>
          ) : (
            <>
              <OutOfStockName>{this.props.product.name}</OutOfStockName>
              <OutOfStockPrice>
                <NumericFormat
                  value={this.getPrice()}
                  fixedDecimalScale
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={this.props.ActiveCurrency.symbol}
                />
              </OutOfStockPrice>
            </>
          )}
        </Link>
      </SingleProduct>
    );
  }
}
