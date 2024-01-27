import React, { Component } from "react";
import { gql } from "@apollo/client";

import { Container, ListOfProducts, MainText } from "./ProductsList.style";
import ProductBox from "../ProductBox";

const GET_PRODUCTS = gql`
  query ($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        gallery
        inStock
        brand
        id
        name
        attributes {
          name
          items {
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ActiveCategory !== this.props.ActiveCategory) {
      this.getProducts();
    }
  }

  async getProducts() {
    const result = await this.props.client.query({
      query: GET_PRODUCTS,
      variables: { category: this.props.ActiveCategory },
    });

    if (result.data) {
      if (result.data.category) {
        if (result.data.category.products) {
          if (result.data.category.products.length) {
            this.setState({
              products: result.data.category.products,
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <Container>
        <MainText>{this.props.ActiveCategory}</MainText>
        <ListOfProducts>
          {this.state.products.map((product, index) => {
            return (
              <ProductBox
                key={index}
                product={product}
                ActiveCurrency={this.props.ActiveCurrency}
                onChangeCartItem={this.props.onChangeCartItem}
              />
            );
          })}
        </ListOfProducts>
      </Container>
    );
  }
}
