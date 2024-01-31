import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

import {
  NavbarContainer,
  Wrapper,
  LeftContainer,
  Category,
  ActiveCategory,
  InnerContainer,
  Bag,
  RightContainer,
} from "./Navbar.style";

import bag from "./bag.png";
import CurrenciesSelector from "../CurrenciesSelector";
import { withCategoryParam } from "../withRouter";
import CartDropdown from "../CartDropdown";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: "",
      ActiveCurrency: {},
    };
  }

  componentDidMount() {
    if (!this.state.categories.length) {
      this.getCategories();
    }
  }

  onChangeCategory = (category) => {
    this.setState({ category });
    this.props.onChangeCategory(category);
  };

  onChangeActiveCurrency = (currency) => {
    this.setState({ ActiveCurrency: currency });
    this.props.onChangeActiveCurrency(currency);
  };

  async getCategories() {
    const result = await this.props.client.query({
      query: GET_CATEGORIES,
    });

    const categories = [...this.state.categories];

    if (result.data) {
      if (result.data.categories) {
        result.data.categories.map((item) => categories.push(item.name));
      }
    }

    let category = categories[0];

    if (this.props.category) {
      const categoryExist = categories.findIndex(
        (navCategory) => navCategory === this.props.category
      );

      if (categoryExist > -1) {
        category = this.props.category;
      }
    }

    this.setState({
      categories,
      category,
    });

    this.onChangeCategory(category);
  }

  getCategory() {
    const categoryExist = this.state.categories.findIndex(
      (navCategory) => navCategory === this.props.category
    );

    if (categoryExist > -1) {
      return this.props.category;
    }

    return this.state.category;
  }

  render() {
    return (
      <NavbarContainer>
        <Wrapper>
          <LeftContainer>
            {this.state.categories.map((category, index) => {
              return (
                <Link to={`/products/${category}`} key={index}>
                  {category === this.getCategory() ? (
                    <ActiveCategory
                      onClick={() => this.onChangeCategory(category)}
                    >
                      {category}
                    </ActiveCategory>
                  ) : (
                    <Category onClick={() => this.onChangeCategory(category)}>
                      {category}
                    </Category>
                  )}
                </Link>
              );
            })}
          </LeftContainer>
          <InnerContainer>
            <Link to="/">
              <Bag src={bag} />
            </Link>
          </InnerContainer>
          <RightContainer>
            <CurrenciesSelector
              client={this.props.client}
              onChangeActiveCurrency={this.onChangeActiveCurrency}
            />

            <CartDropdown
              cartItemsCount={this.props.cartItemsCount}
              ActiveCurrency={this.state.ActiveCurrency}
              onChangeCartItem={this.props.onChangeCartItem}
              disableDropDown={this.props.disableDropDown}
              onViewCardListBackdropFilter={
                this.props.onViewCardListBackdropFilter
              }
              onChangeDropDownVisibility={this.props.onChangeDropDownVisibility}
              DropDownVisibility={this.props.DropDownVisibility}
            />
          </RightContainer>
        </Wrapper>
      </NavbarContainer>
    );
  }
}

export default withCategoryParam(Navbar);
